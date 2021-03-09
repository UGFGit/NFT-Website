import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import '../static/styles/audio-player.scss';

interface PlayerProps{
    src: string;
}

function Player({ src }: PlayerProps){
    return (
        <div className = "audio-player-root">
            <AudioPlayer
                src={src}
                showJumpControls = {false}
            />
        </div>
    )
}

export default Player;