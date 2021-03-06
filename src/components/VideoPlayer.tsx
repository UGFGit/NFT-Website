import React from 'react';
import ReactPlayer from 'react-player';
import '../static/styles/video-player.scss';
import VideoIcon from '../static/images/video-icon.png';
import VideoMutedIcon from '../static/images/video-muted.png';
import { isMobile } from 'react-device-detect';

interface PlayerProps{
    src: string;
    controls?: boolean;
    muted?: boolean;
    loop?: boolean;
    playing?: boolean;
    placeholder?: string;
}

function Player({ src, controls = false, muted = true, loop = true, playing = true, placeholder }: PlayerProps){
    return(
        <div className = 'video-player-root'>
            {!placeholder && <ReactPlayer 
                width = '100%' 
                height = "100%"
                url = {src} 
                playing = { isMobile ? false : playing }
                loop = { loop }
                muted = { muted }
                controls = {controls} 
                config={
                    { 
                        file: { 
                            attributes: {
                            controlsList: 'nodownload'
                            }
                        }
                    }
                }
            />}
            {isMobile && placeholder && <div><img style = {{width: "100%"}} alt ="" src = {placeholder} /></div>}
            {!controls && <div className = "video-player-video-icon-wrap">
                <img alt="" src = {VideoIcon}/>
            </div>}
            {muted && <div className = "video-player-muted-icon-wrap">
                <img alt="" src = {VideoMutedIcon}/>
            </div>}
        </div>
    )
}

export default Player;