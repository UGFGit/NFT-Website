import React from 'react';
import { IAsset } from '../interfaces/containers/Application/asset.interface';
import '../static/styles/card.scss';
import Avatar from '@material-ui/core/Avatar';
import { FILESTORE } from '../constants/endpoints';
//@ts-ignore
import ImageLoader from 'react-load-image';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageNotFound from '../static/images/image-not-found.jpg';
import { useHistory } from "react-router-dom";

interface CardProps{
    asset: IAsset
}

function TokenCard({ asset }: CardProps){
    const history = useHistory();

    const { artist, metadata, price, cryptoPrice, token, id } = asset;

    return(
        <div>
            <div onClick = {() => history.push(`/assets/${id}`)} className = "card-root">
                <ImageLoader
                    className = "card-image-wrap"
                    src={FILESTORE(metadata.filePlaceholder || metadata.filename)}
                >
                    <img className = "card-img" alt = "" />
                    <img className = "card-img" alt = "" src = {ImageNotFound} />
                    <div>
                        <CircularProgress size={80} thickness={5} />
                    </div>
                </ImageLoader>
                <div className = "card-body">
                    <div className = "card-body-name-wrap">
                        <p className = "card-body-name">{metadata.name}</p>
                        <p className = "card-body-name">{token.available} of {token.count}</p>
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
                </div>        
            </div>
        </div>
    )
}

export default TokenCard;