import React from 'react';
import { FILESTORE } from '../../constants/endpoints';
import { IConfigState } from '../../interfaces/reducers/config.interface';
import '../../static/styles/artist-card.scss';
import Avatar from '@material-ui/core/Avatar';
import ImageNotFound from '../../static/images/image-not-found.jpg';
//@ts-ignore
import ImageLoader from 'react-load-image';
import Lottie from "../../components/Lottie";

function Card({ host, name, banner, avatar, artist, multiple }: IConfigState){
    return(
        <div className = "artist-card-root" onClick = {() => {
            window.location.assign(`http://${host}`);
        }}>
            <ImageLoader
                className = "artist-card-image-wrap"
                //@ts-ignore
                src={FILESTORE(multiple? banner: artist.background)}
            >
                <img alt = "" />
                <img alt = "" src = {ImageNotFound} />
                <Lottie width= {80} height={80}/>
            </ImageLoader>
            <div className = "artists-card-avatar-wrap">
                {/* @ts-ignore */}
                <Avatar alt="" src = {FILESTORE(multiple? avatar: artist.avatar)}/>
            </div>
            <div className = "artist-card-name-wrap">
                <p className = 'artist-card-name'>{multiple? name: artist?.name}</p>
            </div> 
        </div>
    )
}

export default Card;