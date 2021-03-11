import React, { useState, useEffect } from 'react';
import '../../static/styles/asset.scss';
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';
import { fetch } from '../../libs';
import { ASSETS_ONE, FILESTORE, BLOCKCHAIN_NONCE, BLOCKCHAIN_BUY, ASSET_BIDS, ASSET_BID_SET, ASSET_BID_REMOVE } from '../../constants/endpoints';
import Web3 from 'web3';
import { ABI } from '../../constants/blockchain/abi';
import { useSnackbar } from 'notistack';
import { IWeb3State } from '../../interfaces/reducers/web3.interface';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import { useHistory } from "react-router-dom";
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ResizeImage from '../../static/images/asset-resize-btn.png';
import Progress from '../../components/Progress';
import Avatar from '@material-ui/core/Avatar';
import WethImage from '../../static/images/weth-img.png';
import Tooltip from '@material-ui/core/Tooltip';
import { TYPES, PRIMARY_TYPE, REQUEST_METHOD } from '../../constants/blockchain/erc1155';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSocket } from '../../socket';
import { SocketEventsEnum } from '../../constants/socket/events';
import Dialog from './Dialog';
import Timer from './Timer';

interface AssetPageProps{
    assetId: string;
    web3: IWeb3State;
}

interface IBids{
    id: string;
    account: string;
    cryptoPrice: number;
    price: number;
}

function AssetPage({ assetId, web3 }: AssetPageProps){
    const history = useHistory();
    const [asset, setAsset] = useState<IAsset>({} as IAsset);
    const [load, setLoad] = useState(true);
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const [ dialogOpen, setDialogOpen ] = useState(false);

    const [assetSold, setAssetSold] = useState(false);

    const [bids, setBids] = useState<IBids[]>([]);

    const socket = useSocket();

    const { enqueueSnackbar } = useSnackbar();

    const loadAsset = async () => {
        const response = await fetch.get(ASSETS_ONE(assetId));

        if(response.ok){
            const { asset } = await response.json();
            setAsset(asset);
            return setLoad(false);
        }

        return history.push('/404');        
    }

    const loadBids = async () => {
        if(!asset.id){
            return;
        }

        const response = await fetch.post(ASSET_BIDS, { assetId: asset.id });
        if(response.ok){
            const { bids } = await response.json();
            setBids(bids);
        }
    }

    useEffect(() => {
        loadAsset();
    }, []);

    useEffect(() => {
        loadBids();
    }, [asset])

    useEffect(() => {
        socket?.on(SocketEventsEnum.ASSET_SOLD, ({ id }: {id: string}) => {
            if(asset.id === id){
                setAssetSold(true);
            }
        })

        socket?.on(SocketEventsEnum.ASSET_UPDATE, (newAsset: IAsset) => {
            setAsset(newAsset);
        })

        return () => {
            socket?.removeListener(SocketEventsEnum.ASSET_SOLD);
            socket?.removeListener(SocketEventsEnum.ASSET_UPDATE);
        }
    }, [socket, asset])


    const checkAllowance = async (client:Web3, contractAddress: string, paymentAddress: string) => {
        //@ts-ignore
        const contract = new client.eth.Contract(ABI, paymentAddress);
        const allowance = await contract.methods.allowance(web3.account, contractAddress).call();
        if(Number(allowance) === 0){
            const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
            const tx = contract.methods.approve(contractAddress, amount);
            const abi = tx.encodeABI();
            const gas = await tx.estimateGas({ from: web3.account });
            const gasPrice = await client.eth.getGasPrice();
            await client.eth.sendTransaction({ from: web3.account, to: paymentAddress, data: abi,  gas, gasPrice });
            enqueueSnackbar(`Allowance was send`, { variant: 'success' });
        }
        return;
    } 

    const getNonce = async () => {
        const response = await fetch.post(BLOCKCHAIN_NONCE, { contractAddress: asset.contract.contract, account: web3.account});
        const { nonce } = await response.json();
        return nonce;
    }


    const handleBuy = async () => {
        if(web3.available){
            try{
                setButtonLoading(true);
                const client = new Web3(web3.provider);
                await checkAllowance(client, asset.contract.contract, asset.tradingTokenAddress);

                //@ts-ignore
                const contract = new client.eth.Contract(ABI, asset.tradingTokenAddress);
                const decimal = await contract.methods.decimals().call();
                const value = `${asset.cryptoPrice * Math.pow(10, decimal)}`;

                const data = {
                    types: TYPES,
                    primaryType: PRIMARY_TYPE,
                    domain: {
                        name: asset.contract.domainName,
                        version: asset.contract.version,
                        chainId: asset.contract.chainId,
                        verifyingContract: asset.contract.contract
                    },
                    message: {
                        from: web3.account,
                        to: asset.owner,
                        tradingTokenAddr: asset.tradingTokenAddress,
                        id: asset.token.tokenId,
                        amount: 1,
                        value,
                        nonce: await getNonce()
                    }
                }

                enqueueSnackbar(`Transaction build complete`, { variant: 'success' });

                const signature = await web3.provider.request({
                    method: REQUEST_METHOD,
                    params: [web3.account, JSON.stringify(data)],
                    from: [web3.account]
                });

                if(asset.onAuction){
                    await fetch.post(ASSET_BID_SET, { 
                        account: web3.account, 
                        signature,
                        assetId: asset.id,
                        price: asset.cryptoPrice
                    }); 

                    enqueueSnackbar(`The rate is fixed`, { variant: 'success' });
                }

                if(!asset.onAuction){
                    enqueueSnackbar(`Waiting for transaction complete`, { variant: 'info' });

                    await fetch.post(BLOCKCHAIN_BUY, { 
                        account: web3.account, 
                        contractAddress: asset.contract.contract, 
                        tokenId: asset.token.tokenId, 
                        price: value, 
                        tradingTokenAddress: asset.tradingTokenAddress, 
                        signature,
                        assetId: asset.id
                    });

                    enqueueSnackbar(`The purchase was made`, { variant: 'success' });
                }
                setButtonLoading(false);
            } catch(err){
                setButtonLoading(false);
                enqueueSnackbar("Something went wrong", { variant: 'error' });
            }            
        }
    }

    const removeBid = async (bidId: string) => {
        const response = await fetch.post(ASSET_BID_REMOVE, { bidId });
        if(response.ok){
            setBids([...bids.filter(bid => bid.id !== bidId)]);
        }
    }

    if(load){
        return <Progress/>
    }

    const disableButton = assetSold || (web3.account ? web3.account.toLowerCase() === asset.owner.toLowerCase(): false) || asset.onAuction && (new Date(asset.auctionEnd).getTime() - Date.now() < 0);

    return (
        <DocumentTitle title="Dashboard">
            <div className = "asset-root">
                <Navigation/>
                <div className = "asset-body">
                    <div className = "asset-image-container">
                        <div className = "asset-image-container-nav">
                            <div onClick = {() => setDialogOpen(true)} className = "asset-image-container-nav-resize-wrap">
                                <img alt ="" src = {ResizeImage}/>
                            </div>
                        </div>
                        <div className = "asset-image-container-image-wrap">
                            <img alt = "" src={FILESTORE(asset.metadata.filePlaceholder || asset.metadata.filename)}/>
                        </div>
                    </div>
                    <div className = "asset-description-container">
                        <div className = "asset-description-container-nav">
                            <Avatar alt="" src = {FILESTORE(asset.artist.avatar)}/>
                            <p className = "asset-description-container-nav-artist-name">{asset.artist.name}</p>
                        </div>
                        <p className = "asset-description-container-title">{asset.metadata.name}</p>
                        <p className = "asset-description-container-desc">{asset.metadata.description}</p>
                        { asset.onAuction && <div className = "asset-description-container-auction-container">
                            <Timer
                                timeEnd = {asset.auctionEnd}
                            />
                            <p className = "asset-description-container-auction-title">BIDS</p>
                            <div className = "asset-description-container-auction-table">
                                <div className = "asset-description-container-auction-table-header">
                                    <p className = "from-colm">From</p>
                                    <p className = 'price-colm'>Price</p>
                                    <p className = "expiration-colm">Expiration</p>
                                    <p className = "action-colm"></p>
                                </div>
                                <div className = "asset-description-container-auction-table-body">
                                    {bids.map((bid) => (
                                        <div className = "table-row" key = {bid.id}>
                                            <p className = "from-colm">{`${bid.account.slice(0, 6)}...${bid.account.slice(38)}`}</p>
                                            <div className = "price-colm table-prices-wrap">
                                                <Tooltip arrow title = "WETH" placement = "top">
                                                    <div className = "table-prices-wrap-img-wrap">
                                                        <img alt = "" src = {WethImage}/>
                                                    </div>
                                                </Tooltip>
                                                <p>{bid.cryptoPrice}</p>
                                                <p className = "table-prices-wrap-price">${bid.price}</p>
                                            </div>
                                            <p className = "expiration-colm">In 5 Days</p>
                                            {web3.account === bid.account && <button disabled = {new Date(asset.auctionEnd).getTime() - Date.now() < 0} onClick = {() => removeBid(bid.id)} className = "action-colm">Close</button>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>}
                        <div className = "asset-description-container-price-container">
                            <div className = "asset-description-container-price-container-price-wrap">
                                <Tooltip arrow title = "WETH" placement = "top">
                                    <div className = "asset-description-container-price-container-price-crypto-wrap">
                                        <img alt = "" src = {WethImage}/>
                                    </div>
                                </Tooltip>
                                <p className = "asset-description-container-price-container-price">{asset.cryptoPrice}</p>
                                <div className = "asset-description-container-price-devider"/>
                                <p className = "asset-description-container-price-container-price">${asset.price}</p>
                                <p className = "asset-description-container-price-container-counts">{assetSold? 'Sold out' : `${asset.token.available} of ${asset.token.count}`}</p>
                            </div>
                            <div className = "asset-description-container-price-container-btn-wrap">
                                { !buttonLoading && <button disabled = {disableButton} onClick = {handleBuy} className = "asset-description-container-price-container-buy-btn" style = {{ opacity: disableButton? '0.2' : '1'}}> {asset.onAuction? "Place bid" : "Buy"} </button> }
                                { buttonLoading && <div className = "asset-description-container-price-container-buy-loader"> <CircularProgress size={40} thickness={5} /></div> }
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    asset = {asset}
                    open={dialogOpen}
                    onClose = {() => setDialogOpen(false)}
                />
                <div className = "asset-footer-wrap">
                    <Footer/>
                </div>
            </div>
        </DocumentTitle>
    )
}

function mapStateToProps(state: { web3: IWeb3State}) {
    return {
        web3 : state.web3,
    }
}

export default connect(mapStateToProps)(AssetPage);