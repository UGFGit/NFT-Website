import React from 'react';
import TwitterIcon from '../static/images/twitter-icon.png';
import ArtistSocialOpen from '../static/images/artist-socials-active.png';
import ArtistSocialDisabel from '../static/images/artict-socials-disable.png';
import InstagramIcon from '../static/images/instagram-link.png';
import SpotifyIcon from '../static/images/spotify-link.png';
import SoundcloudIcon from '../static/images/soundcloud-link.png';
import Tooltip from '@material-ui/core/Tooltip';
import '../static/styles/share.scss';

interface IShareProps{
    open: boolean;
    handleClose: () => void;
    instagram?: string;
    twitter?: string;
    spotify?: string;
    soundcloud?: string;
}

function SocialLinks({ open, handleClose, instagram, twitter, spotify, soundcloud }: IShareProps){
    const count = [instagram, twitter, spotify, soundcloud].filter((r) => Boolean(r));

    const openLink = (url: string) => {
        window.open(url, '_blank')
    }

    return (
        <div className = "share-root">
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                placement = 'bottom-end'
                title = {
                    <div 
                        className = "share-tooltip-root"
                        style = {{
                            gridTemplateColumns: `repeat(${count.length}, 1fr)`,
                        }}
                    >
                        {instagram && <div onClick = {() => openLink(instagram)} className = "share-tooltip-item">
                            <div className = "share-tooltip-item-img-wrap">
                                <img alt = "" src = {InstagramIcon}/>
                            </div>
                            <p>Instagram</p>
                        </div>}
                        {twitter && <div onClick = {() => openLink(twitter)} className = "share-tooltip-item">
                            <div className = "share-tooltip-item-img-wrap">
                                <img alt = "" src = {TwitterIcon}/>
                            </div>
                            <p>Twitter</p>
                        </div>}
                        {spotify && <div onClick = {() => openLink(spotify)} className = "share-tooltip-item">
                            <div className = "share-tooltip-item-img-wrap">
                                <img alt = "" src = {SpotifyIcon}/>
                            </div>
                            <p>Spotify</p>
                        </div>}
                        {soundcloud && <div onClick = {() => openLink(soundcloud)} className = "share-tooltip-item">
                            <div className = "share-tooltip-item-img-wrap">
                                <img alt = "" src = {SoundcloudIcon}/>
                            </div>
                            <p>Soundcloud</p>
                        </div>}
                    </div>
                }
                onClose={handleClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
            >
                <div onClick = {handleClose} className = "share-wrap">
                    <img style = {{width: 24, height: 24}} alt ="" src = {open? ArtistSocialOpen : ArtistSocialDisabel}/>
                </div>
            </Tooltip>
        </div>
    )
}

export default SocialLinks;