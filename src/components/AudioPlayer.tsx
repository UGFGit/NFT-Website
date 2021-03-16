import React, { useRef, useState, useEffect } from 'react';
import '../static/styles/audio-player.scss';
import PlayIcon from '../static/images/sound_play.png';
import PauseIcon from '../static/images/sound_pause.png';
import MuteIcon from '../static/images/sound_mute.png';
import VolumeIcon from '../static/images/sound_volume.png';
import useInterval from '../libs/use-interval';

interface PlayerProps{
    src: string;
}

interface BarProps{
    currentTime: string;
    currentTimePos: string;
}

function Player({ src }: PlayerProps){
    const audio = useRef<HTMLAudioElement>(null);

    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false);

    const [barProps, setBarProps] = useState<BarProps>({ currentTime: '0:0', currentTimePos: '0%'});


    const handlePlay = async () => {
        const current = audio.current;

        if(!current){
            return;
        }

        if(current.paused && current.src){
            try{
                await current.play();
                setPlay(true);
            } catch(err){
                console.log("Play player err: ", err);
            }         
        } else {
            current.pause();
            setPlay(false);
        }
    }

    const handleVolume = () => {
        const current = audio.current;

        if(!current){
            return;
        }

        if(mute){
            current.volume = 1;
            setMute(false);
        } else {
            current.volume = 0;
            setMute(true);
        }
    }

    const getDuration = (): number => {
        const current = audio.current;
        return current? current.duration : 0;
    }

    const getCurrentTime = (): number => {
        const current = audio.current;
        return current? current.currentTime : 0;
    }

    const getProgress = () => {
        const duration = getDuration();
        const currentTime = getCurrentTime();
        
        setBarProps({ currentTime: getDisplayTimeBySeconds(currentTime, duration), currentTimePos: `${((currentTime / duration) * 100).toFixed(2)}%`});
    }

    const addHeadingZero = (num: number): string => {
        return num > 9 ? num.toString() : `0${num}`
    }

    const getDisplayTimeBySeconds = (seconds: number, totalSeconds: number): string => {
        const min = Math.floor(seconds / 60)
        const minStr = addHeadingZero(min)
        const secStr = addHeadingZero(Math.floor(seconds % 60))
        const minStrForHour = addHeadingZero(Math.floor(min % 60))
        const hourStr = Math.floor(min / 60)
      
        const mmSs = `${minStr}:${secStr}`
        const hhMmSs = `${hourStr}:${minStrForHour}:${secStr}`
      
        if (totalSeconds >= 3600) {
            return hhMmSs
        } else {
            return mmSs
        }
    }

    useEffect(() => {
        getProgress();
    }, [audio]);

    useInterval(() => {
        getProgress();
    }, 1000);

    return (
        <div className = "audio-player-root">
            <audio preload = 'auto' ref={audio} src = {src}/>
            <div className = "audio-player-controllers">
                <div onClick = {handlePlay} className = "audio-player-controllers-img-wrap">
                    <img alt = "" src = {play? PauseIcon: PlayIcon}/>
                </div>
                <div className = "audio-player-controllers-bar-wrap">
                    <div style = {{width: barProps.currentTimePos}} className = "audio-player-controllers-bar"/>
                </div>
                <div className = "audio-player-controllers-duration-wrap">
                    <p>{barProps.currentTime}</p>
                </div>
                <div onClick = {handleVolume} className = "audio-player-controllers-img-wrap">
                    <img alt = "" src = {mute? VolumeIcon: MuteIcon}/>
                </div>
            </div>
        </div>
    )
}

export default Player;