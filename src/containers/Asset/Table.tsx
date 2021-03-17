import React, { useState, useEffect } from 'react';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import WethImage from '../../static/images/weth-img.png';
import Tooltip from '@material-ui/core/Tooltip';
import { IWeb3State } from '../../interfaces/reducers/web3.interface';
import { fetch } from '../../libs';
import { ASSET_BIDS, ASSET_BID_REMOVE } from '../../constants/endpoints';
import { useSocket } from '../../socket';
import { SocketEventsEnum } from '../../constants/socket/events';
import moment from 'moment';
import EthIcon from '../../static/images/Ethereum-grey.png';

interface IBid{
    id: string;
    account: string;
    cryptoPrice: number;
    price: number;
    expiryDate: string;
}

interface TableProps{
    asset: IAsset,
    web3: IWeb3State
}

function Table({ asset, web3 }: TableProps){
    const socket = useSocket();

    const [bids, setBids] = useState<IBid[]>([]);

    useEffect(() => {
        loadBids();
    }, [asset])

    useEffect(() => {
        socket?.on(SocketEventsEnum.BIDS_UPDATE, ({assetId, bids}: {assetId: string, bids: IBid[]}) => {
            if(asset.id === assetId){
                setBids(bids);
            }
        })

        return () => {
            socket?.removeListener(SocketEventsEnum.BIDS_UPDATE);
        }
    }, [socket])

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


    const removeBid = async (bidId: string) => {
        const response = await fetch.post(ASSET_BID_REMOVE, { bidId });
        if(response.ok){
            setBids([...bids.filter(bid => bid.id !== bidId)]);
        }
    }

    const disableButton = new Date(asset.auctionEnd).getTime() - Date.now() < 0;

    const renderExpire = (bid: IBid) => {
        const diff = moment({hours: 0}).diff(bid.expiryDate, 'days') * -1;

        if(diff >= 0){
            if(diff === 0){
                return (<p>Today</p>)
            }

            if(diff === 1){
                return (<p>Tomorrow</p>)
            }

            return (<p>In {diff} days</p>)
        }
        
        return (<p>Expired</p>)
    }

    return(
        <div className = "asset-description-container-auction-table">
            <div className = "asset-description-container-auction-table-header">
                <p>From</p>
                <p>Price</p>
                <p>Expiration</p>
                <p></p>
            </div>
            <div className = "asset-description-container-auction-table-body">
                {bids.map((bid) => (
                    <div className = "table-row" key = {bid.id}>
                        <p>{`${bid.account.slice(0, 6)}...${bid.account.slice(38)}`}</p>
                        <div className = "table-prices-wrap">
                            <Tooltip arrow title = "WETH" placement = "top">
                                <div className = "table-prices-wrap-img-wrap">
                                    <img alt = "" src = {EthIcon}/>
                                </div>
                            </Tooltip>
                            <p>{bid.cryptoPrice}</p>
                            <p className = "table-prices-wrap-price"><span>$</span>{bid.price.toFixed(2)}</p>
                        </div>
                        {renderExpire(bid)}
                        {web3.account === bid.account && <button disabled = {disableButton} onClick = {() => removeBid(bid.id)}>Close</button>}
                     </div>
                ))}
            </div>
        </div>
    )
}

export default Table;