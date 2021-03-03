import React from 'react';
import { FILESTORE } from '../../constants/endpoints';
import { IArtist } from '../../interfaces/containers/Artists/artist.interface';
import '../../static/styles/artist-card.scss';
import Avatar from '@material-ui/core/Avatar';

function Card({ host, name, background, avatar }: IArtist){
    return(
        <div className = "artist-card-root" onClick = {() => {
            alert(`redirect to http://${host}`)
        }}>
            <div className = "artist-card-image-wrap">
                <img alt = "" src = {FILESTORE(background)}/>
            </div>
            <div className = "artists-card-avatar-wrap">
                <Avatar alt="" src = {avatar}/>
            </div>
            <div className = "artist-card-name-wrap">
                <p className = 'artist-card-name'>{name}</p>
            </div> 
        </div>
    )
}

export default Card;