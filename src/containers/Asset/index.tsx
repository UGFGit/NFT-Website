import React, { useState, useEffect } from 'react';
import '../../static/styles/asset.scss';
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';
import { fetch } from '../../libs';
import { ASSETS_ONE, FILESTORE, BLOCKCHAIN_BUY, ASSET_BID_SET, CRYPTO_COMPARE } from '../../constants/endpoints';
import Web3 from 'web3';
import { useSnackbar } from 'notistack';
import { IWeb3State } from '../../interfaces/reducers/web3.interface';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import { useHistory } from "react-router-dom";
import Navigation from '../../components/Navigation';
import ResizeImage from '../../static/images/asset-resize-btn.png';
import Progress from '../../components/Progress';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { useSocket } from '../../socket';
import { SocketEventsEnum } from '../../constants/socket/events';
import VideoDialog from './VideoDialog';
import Timer from './Timer';
import Table from './Table';
import { checkAllowance, createSignature, checkBalance, UOP_ADDRESS, WETH_ADDRESS } from './blockchain';
import PlaceBidDialog from './PlaceBidDialog';
import ReactPlayer from '../../components/VideoPlayer';
import AudioPlayer from '../../components/AudioPlayer';
import Lottie from "../../components/Lottie";
import EthIcon from '../../static/images/Ethereum-grey.png';
import EthWhiteIcon from '../../static/images/Ethereum.png';
import UopIcon from '../../static/images/uop-grey.png';
import { CurrencyEnum } from '../../constants/blockchain/currency';
import classNames from 'classnames';

interface AssetPageProps{
    assetId: string;
    web3: IWeb3State;
}

interface IPrices{
    [key: string]: {
        [key: string]: number
    }
}

function AssetPage({ assetId, web3 }: AssetPageProps){
    const history = useHistory();
    const [asset, setAsset] = useState<IAsset>({} as IAsset);
    const [prices, setPices] = useState<IPrices>({});
    const [load, setLoad] = useState(true);
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const [ videoDialogOpen, setVideoDialogOpen ] = useState(false);
    const [ placeBidDialogOpen, setPlaceBidDialogOpen ] = useState(false);

    const [assetSold, setAssetSold] = useState(false);

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

    const loadPrices = async () => {
        const response = await fetch.get(CRYPTO_COMPARE);
        if(response.ok){
            const body = await response.json();
            setPices(body);
        }
    }

    const changeCurrency = (currency: CurrencyEnum) => () => {
        if(asset.onAuction){
            return;
        }
        
        asset.currency = currency;

        asset.cryptoPrice = +(asset.price * (currency === CurrencyEnum.UOP? prices.USD.UOP : prices.USD.WETH)).toFixed(18);

        setAsset(Object.assign({}, asset));
    }

    useEffect(() => {
        loadAsset();
        loadPrices()
    }, []);

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
    
    const handleBuy = async () => {
        if(web3.available){
            try{
                const tradingTokenAddress = asset.currency === CurrencyEnum.UOP? UOP_ADDRESS : WETH_ADDRESS;

                setButtonLoading(true);
                const client = new Web3(web3.provider);
                await checkAllowance(web3.account ,client, asset.contract.contract, tradingTokenAddress, enqueueSnackbar);

                const balance = await checkBalance(client, tradingTokenAddress, web3.account);
                
                if(Number(asset.cryptoPrice) > Number(balance)){
                    setButtonLoading(false);
                    return enqueueSnackbar(`Insufficient funds`, { variant: 'error' });
                }

                const {signature, value, deadline} = await createSignature(asset, tradingTokenAddress, client, web3, enqueueSnackbar);
                enqueueSnackbar(`Waiting for transaction complete`, { variant: 'info' });
                await fetch.post(BLOCKCHAIN_BUY, { 
                    account: web3.account, 
                    contractAddress: asset.contract.contract, 
                    tokenId: asset.token.tokenId, 
                    price: value, 
                    tradingTokenAddress, 
                    signature,
                    assetId: asset.id,
                    deadline
                });

                enqueueSnackbar(`The purchase was made`, { variant: 'success' });
                setButtonLoading(false);
            } catch(err){
                console.log(err)
                setButtonLoading(false);
                enqueueSnackbar("Something went wrong", { variant: 'error' });
            }            
        }
    }

    const handlePlaceBit = async (price: number) => {
        if(web3.available){
            try{
                setButtonLoading(true);
                const client = new Web3(web3.provider);
                await checkAllowance(web3.account ,client, asset.contract.contract, asset.tradingTokenAddress, enqueueSnackbar);
                const {signature, deadline} = await createSignature(asset, asset.tradingTokenAddress , client, web3, enqueueSnackbar, price);
                
                await fetch.post(ASSET_BID_SET, { 
                    account: web3.account, 
                    signature,
                    assetId: asset.id,
                    price,
                    deadline
                }); 

                enqueueSnackbar(`The rate is fixed`, { variant: 'success' });

                setButtonLoading(false);
            } catch(err){
                console.log(err)
                setButtonLoading(false);
                enqueueSnackbar("Something went wrong", { variant: 'error' });
            }            
        }
    }

    if(load){
        return <Progress/>
    }

    const renderLeftContent = () => {
        if(asset.metadata.mimetype.split('/')[0] === 'video'){
            return <ReactPlayer src = {FILESTORE(asset.metadata.filename)}/>
        }
        if(asset.metadata.mimetype.split('/')[0] === 'audio'){
            return(
                <div className = "asset-image-container-image-wrap">
                    <img alt = "" src={FILESTORE(asset.metadata.filePlaceholder || asset.metadata.filename)}/>
                    <div className = "asset-image-container-audio-player-wrap">
                        <AudioPlayer
                            src = {FILESTORE(asset.metadata.filename)}
                        />
                    </div>
                </div>
            )
        }
        return (
            <div className = "asset-image-container-image-wrap">
                <img alt = "" src={FILESTORE(asset.metadata.filePlaceholder || asset.metadata.filename)}/>
            </div>
        )
    }

    const timeEnd = new Date(asset.auctionEnd).getTime() - Date.now() < 0;
    const curentUser = web3.account ? web3.account.toLowerCase() === asset.owner.toLowerCase(): false;
    const disableButton = assetSold || curentUser || asset.onAuction && timeEnd;

    return (
        <DocumentTitle title="Dashboard">
            <div className = "asset-root">
                <Navigation/>
                <div className = "asset-body">
                    <div className = "asset-image-container">
                        <div className = "asset-image-container-nav">
                            {asset.metadata.mimetype.split('/')[0] === 'video' && <div onClick = {() => setVideoDialogOpen(true)} className = "asset-image-container-nav-resize-wrap">
                                <img alt ="" src = {ResizeImage}/>
                            </div>}
                        </div>
                        {renderLeftContent()}
                    </div>
                    <div className = "asset-description-container">
                        <div onClick = {() =>  {
                            if(asset.artist.host){
                                window.location.assign(`https://${asset.artist.host}`)
                            }                            
                        }} style = {{cursor: asset.artist.host? 'pointer': 'default'}} className = "asset-description-container-nav">
                            <Avatar alt="" src = {FILESTORE(asset.artist.avatar)}/>
                            <p className = "asset-description-container-nav-artist-name">{asset.artist.name}</p>
                        </div>
                        <p className = "asset-description-container-title">{asset.metadata.name}</p>
                        {asset.metadata.description && <p className = "asset-description-container-desc">{asset.metadata.description}</p>}
                        {!asset.metadata.description && <p className = "asset-description-container-desc-empty">Oh, snap, we are missing the description for this collectible. It's beautiful isn't it?</p>}
                        { asset.onAuction && <div className = "asset-description-container-auction-container">
                            <Timer
                                timeEnd = {asset.auctionEnd}
                            />
                            <p className = "asset-description-container-auction-title">BIDS</p>
                            <Table
                                web3={web3}
                                asset={asset}
                            />
                        </div>}
                        {(asset.onAuction || asset.onSale) && <div className = "asset-description-container-price-container">
                            <div className = "asset-description-container-price-container-select-wrap">
                                <div  className = "asset-description-radio-wrap">
                                    <div onClick = {changeCurrency(CurrencyEnum.UOP)} className = {classNames("asset-description-radio-item", {'active': asset.currency === CurrencyEnum.UOP})}>
                                        <img alt ="" className = 'uop' src = {UopIcon}/>
                                        <p>UOP</p>
                                    </div>
                                    <div onClick = {changeCurrency(CurrencyEnum.WETH)} className = {classNames("asset-description-radio-item", {'active': asset.currency === CurrencyEnum.WETH})}>
                                        <img alt ="" className = 'weth' src = {asset.currency === CurrencyEnum.WETH? EthWhiteIcon: EthIcon}/>
                                        <p>WETH</p>                                        
                                    </div>
                                </div>
                                <p className = "asset-description-container-price-container-counts">{assetSold? 'Sold out' : `${asset.token.available} of ${asset.token.count}`}</p>
                            </div>
                            <div className = "asset-description-container-price-container-price-wrap">
                                <Tooltip arrow title = {asset.currency === CurrencyEnum.UOP? "UOP" : "WETH"} placement = "top">
                                    <div className = {classNames("asset-description-container-price-container-price-crypto-wrap", {'uop': asset.currency === CurrencyEnum.UOP, 'weth': asset.currency === CurrencyEnum.WETH})}>
                                        <img alt = "" src = {asset.currency === CurrencyEnum.UOP? UopIcon :EthIcon}/>
                                    </div>
                                </Tooltip>
                                <p className = "asset-description-container-price-container-price">{asset.cryptoPrice}</p>
                                <div className = "asset-description-container-price-devider"/>
                                <p className = "asset-description-container-price-container-price"><span>$</span>{asset.price.toFixed(2)}</p>
                            </div>
                            <div className = "asset-description-container-price-container-btn-wrap">
                                { !buttonLoading && <button disabled = {disableButton} onClick = {() => asset.onAuction? setPlaceBidDialogOpen(true) : handleBuy()} className = "asset-description-container-price-container-buy-btn" style = {{ opacity: disableButton? '0.2' : '1'}}> {asset.onAuction? "Place bid" : "Buy"} </button> }
                                { buttonLoading && <div className = "asset-description-container-price-container-buy-loader"> <Lottie width={40} height={40}/></div> }
                            </div>
                        </div>}
                    </div>
                </div>
                <VideoDialog
                    asset = {asset}
                    open={videoDialogOpen}
                    onClose = {() => setVideoDialogOpen(false)}
                />
                {placeBidDialogOpen && <PlaceBidDialog
                    open={true}
                    onClose = {() => setPlaceBidDialogOpen(false)}
                    web3 = {web3}
                    paymentAddress={asset.tradingTokenAddress}
                    handleBuy = {(price) => {
                        handlePlaceBit(price);
                        setPlaceBidDialogOpen(false);
                    }}
                    asset = {asset}
                />}
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