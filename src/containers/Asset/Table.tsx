import React, { useState, useEffect } from 'react';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import WethImage from '../../static/images/weth-img.png';
import Tooltip from '@material-ui/core/Tooltip';
import { IWeb3State } from '../../interfaces/reducers/web3.interface';
import { fetch } from '../../libs';
import { ASSET_BIDS, ASSET_BID_REMOVE } from '../../constants/endpoints';
import { useSocket } from '../../socket';
import { SocketEventsEnum } from '../../constants/socket/events';

interface IBids{
    id: string;
    account: string;
    cryptoPrice: number;
    price: number;
}

interface TableProps{
    asset: IAsset,
    web3: IWeb3State
}

function Table({ asset, web3 }: TableProps){
    const socket = useSocket();

    const [bids, setBids] = useState<IBids[]>([]);

    useEffect(() => {
        loadBids();
    }, [asset])

    useEffect(() => {
        socket?.on(SocketEventsEnum.BIDS_UPDATE, ({assetId, bids}: {assetId: string, bids: IBids[]}) => {
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
    
    return(
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
                        {web3.account === bid.account && <button disabled = {disableButton} onClick = {() => removeBid(bid.id)} className = "action-colm">Close</button>}
                     </div>
                ))}
            </div>
        </div>
    )
}

export default Table;