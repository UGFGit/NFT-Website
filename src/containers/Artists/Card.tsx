import React from 'react';
import { FILESTORE } from '../../constants/endpoints';
import { IArtist } from '../../interfaces/containers/Artists/artist.interface';
import '../../static/styles/artist-card.scss';
import Avatar from '@material-ui/core/Avatar';
import ImageNotFound from '../../static/images/image-not-found.jpg';
//@ts-ignore
import ImageLoader from 'react-load-image';
import Lottie from "../../components/Lottie";

function Card({ host, name, background, avatar }: IArtist){
    return(
        <div className = "artist-card-root" onClick = {() => {
            window.location.assign(`https://${host}`);
        }}>
            <ImageLoader
                className = "artist-card-image-wrap"
                src={FILESTORE(background)}
            >
                <img alt = "" />
                <img alt = "" src = {ImageNotFound} />
                <Lottie width= {80} height={80}/>
            </ImageLoader>
            <div className = "artists-card-avatar-wrap">
                <Avatar alt="" src = {FILESTORE(avatar)}/>
            </div>
            <div className = "artist-card-name-wrap">
                <p className = 'artist-card-name'>{name}</p>
            </div> 
        </div>
    )
}

export default Card;