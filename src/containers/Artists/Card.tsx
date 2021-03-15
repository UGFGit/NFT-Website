import React from 'react';
import { FILESTORE } from '../../constants/endpoints';
import { IArtist } from '../../interfaces/containers/Artists/artist.interface';
import '../../static/styles/artist-card.scss';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageNotFound from '../../static/images/image-not-found.jpg';
//@ts-ignore
import ImageLoader from 'react-load-image';

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
                <div>
                    <CircularProgress size={80} thickness={5} />
                </div>
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