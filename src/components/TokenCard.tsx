import React from 'react';
import { IAsset } from '../interfaces/containers/Application/asset.interface';
import '../static/styles/card.scss';
import Avatar from '@material-ui/core/Avatar';
import { FILESTORE } from '../constants/endpoints';
//@ts-ignore
import ImageLoader from 'react-load-image';
import ImageNotFound from '../static/images/image-not-found.jpg';
import { useHistory } from "react-router-dom";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import Lottie from "../components/Lottie";;

interface CardProps{
    asset: IAsset
}

function TokenCard({ asset }: CardProps){
    const history = useHistory();

    const { artist, metadata, price, cryptoPrice, token, id, auctionEnd } = asset;

    const renderTime = () => {
        const diff = moment({hours: 0}).diff(auctionEnd, 'days') * -1;

        if(diff === 0){
            const diff_hours = moment().diff(auctionEnd, 'hours') * -1;

            if(diff_hours === 0){
                const diff_minnets = moment().diff(auctionEnd, 'minutes') * -1;

                if(diff_minnets === 0 ){
                    return(<p>less than 1 minute</p>);
                }
                
                return(<p>{diff_minnets} minute{diff_minnets > 10? 's': ''} left</p>);
            }
            
            return(<p>{diff_hours} hour{diff_hours > 2? 's': ''} left</p>) 
        }

        if(diff < 0){
            return (<p>Auction end</p>)
        }

        return(<p>{diff} day{diff !== 1? 's': ''} left</p>)
    }

    return(
        <div>
            <div onClick = {() => history.push(`/assets/${id}`)} className = "card-root">
                <ImageLoader
                    className = "card-image-wrap"
                    src={FILESTORE(metadata.filePlaceholder || metadata.filename)}
                >
                    <img className = "card-img" alt = "" />
                    <img className = "card-img" alt = "" src = {ImageNotFound} />
                    <Lottie width={80} height={80}/>
                </ImageLoader>
                <div className = "card-body">
                    <div className = "card-body-name-wrap">
                        <p className = "card-body-name">{metadata.name}</p>
                        <p className = "card-body-name-available">{token.available} of {token.count}</p>
                    </div>
                    <div className = "card-body-user-wrap">
                        <Avatar alt="" src = {FILESTORE(artist.avatar)}/>
                        <p className = "card-nickname">{artist.name}</p>
                    </div>                    
                </div>
                <div className = "card-body-footer">
                    <div className = "card-body-footer-price-wrap">
                        <p>{cryptoPrice} WETH</p>
                        <p>${price.toFixed(2)}</p>
                    </div>
                    {asset.onAuction && <div className = "card-body-footer-auction-time-wrap">
                        <AccessTimeIcon color='inherit' style = {{fontSize: 10, marginTop: 3}}/>
                        <p>{renderTime()}</p>
                    </div>}
                </div>        
            </div>
        </div>
    )
}

export default TokenCard;