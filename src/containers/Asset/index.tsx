import React, { useState, useEffect } from 'react';
import '../../static/styles/asset.scss';
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';
import { fetch } from '../../libs';
import { ASSETS_ONE, FILESTORE, BLOCKCHAIN_BUY, ASSET_BID_SET } from '../../constants/endpoints';
import Web3 from 'web3';
import { useSnackbar } from 'notistack';
import { IWeb3State } from '../../interfaces/reducers/web3.interface';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import { useHistory } from "react-router-dom";
import Navigation from '../../components/Navigation';
import ResizeImage from '../../static/images/asset-resize-btn.png';
import Progress from '../../components/Progress';
import Avatar from '@material-ui/core/Avatar';
import WethImage from '../../static/images/weth-img.png';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSocket } from '../../socket';
import { SocketEventsEnum } from '../../constants/socket/events';
import Dialog from './Dialog';
import Timer from './Timer';
import Table from './Table';
import { checkAllowance, createSignature } from './blockchain';
import PlaceBidDialog from './PlaceBidDialog';
import ReactPlayer from 'react-player';
import AudioPlayer from '../../components/AudioPlayer';

interface AssetPageProps{
    assetId: string;
    web3: IWeb3State;
}

function AssetPage({ assetId, web3 }: AssetPageProps){
    const history = useHistory();
    const [asset, setAsset] = useState<IAsset>({} as IAsset);
    const [load, setLoad] = useState(true);
    const [ buttonLoading, setButtonLoading ] = useState(false);
    //const [ dialogOpen, setDialogOpen ] = useState(false);
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

    useEffect(() => {
        loadAsset();
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
                setButtonLoading(true);
                const client = new Web3(web3.provider);
                await checkAllowance(web3.account ,client, asset.contract.contract, asset.tradingTokenAddress, enqueueSnackbar);
                const {signature, value} = await createSignature(asset, client, web3, enqueueSnackbar);
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
                const {signature} = await createSignature(asset, client, web3, enqueueSnackbar, price);
                
                await fetch.post(ASSET_BID_SET, { 
                    account: web3.account, 
                    signature,
                    assetId: asset.id,
                    price
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
            return <ReactPlayer width = '100%' url = {FILESTORE(asset.metadata.filename)} playing loop muted/>
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
                            {/* <div onClick = {() => setDialogOpen(true)} className = "asset-image-container-nav-resize-wrap">
                                <img alt ="" src = {ResizeImage}/>
                            </div> */}
                        </div>
                        {renderLeftContent()}
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
                            <Table
                                web3={web3}
                                asset={asset}
                            />
                        </div>}
                        {(asset.onAuction || asset.onSale) && <div className = "asset-description-container-price-container">
                            <div className = "asset-description-container-price-container-price-wrap">
                                <Tooltip arrow title = "WETH" placement = "top">
                                    <div className = "asset-description-container-price-container-price-crypto-wrap">
                                        <img alt = "" src = {WethImage}/>
                                    </div>
                                </Tooltip>
                                <p className = "asset-description-container-price-container-price">{asset.cryptoPrice}</p>
                                <div className = "asset-description-container-price-devider"/>
                                <p className = "asset-description-container-price-container-price">${asset.price.toFixed(2)}</p>
                                <p className = "asset-description-container-price-container-counts">{assetSold? 'Sold out' : `${asset.token.available} of ${asset.token.count}`}</p>
                            </div>
                            <div className = "asset-description-container-price-container-btn-wrap">
                                { !buttonLoading && <button disabled = {disableButton} onClick = {() => asset.onAuction? setPlaceBidDialogOpen(true) : handleBuy()} className = "asset-description-container-price-container-buy-btn" style = {{ opacity: disableButton? '0.2' : '1'}}> {asset.onAuction? "Place bid" : "Buy"} </button> }
                                { buttonLoading && <div className = "asset-description-container-price-container-buy-loader"> <CircularProgress size={40} thickness={5} /></div> }
                            </div>
                        </div>}
                    </div>
                </div>
                {/* <Dialog
                    asset = {asset}
                    open={dialogOpen}
                    onClose = {() => setDialogOpen(false)}
                /> */}
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