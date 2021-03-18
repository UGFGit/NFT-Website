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

interface DownloadProgress {
    left: string
    width: string
}

interface DownloadProgressState{
    downloadProgressArr?: DownloadProgress[];
    hasDownloadProgressAnimation?: boolean;
}

function Player({ src }: PlayerProps){
    const audio = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<any>();

    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState<DownloadProgressState>({});

    let downloadProgressAnimationTimer: NodeJS.Timeout;

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

    const handelDownloadProgress = (e: Event) => {
        const audioEvent = e.target as HTMLAudioElement;
        const duration = getDuration();

        const downloadProgressArr: DownloadProgress[] = [];

        for (let i = 0; i < audioEvent.buffered.length; i++) {
            const bufferedStart: number = audioEvent.buffered.start(i)
            const bufferedEnd: number = audioEvent.buffered.end(i)
            downloadProgressArr.push({
                left: `${Math.round((100 / duration) * bufferedStart) || 0}%`,
                width: `${Math.round((100 / duration) * (bufferedEnd - bufferedStart)) || 0}%`,
            })
        }

        clearTimeout(downloadProgressAnimationTimer);
        setDownloadProgress({ downloadProgressArr, hasDownloadProgressAnimation: true });
        downloadProgressAnimationTimer = setTimeout(() => {
            setDownloadProgress({ downloadProgressArr, hasDownloadProgressAnimation: false });
        }, 200)
    }

    const getPosX = (event: any): number => {
        if (typeof event.clientX === 'number') {
          return event.clientX
        } else {
          return event.touches[0].clientX
        }
    }

    const handleMouseDownOrTouchStartProgressBar = (event: React.MouseEvent | React.TouchEvent) => {
        const progressBarRect = progressBarRef.current.getBoundingClientRect();
        const maxRelativePos = progressBarRect.width;
        
        let relativePos = getPosX(event) - progressBarRect.left;
        
        if (relativePos < 0) {
            relativePos = 0;
        } else if (relativePos > maxRelativePos) {
            relativePos = maxRelativePos;
        }

        const duration = getDuration()
        const currentTime = (duration * relativePos) / maxRelativePos;
        const currentTimePos = `${((relativePos / maxRelativePos) * 100).toFixed(2)}%`;

        setBarProps({ currentTime: getDisplayTimeBySeconds(currentTime, duration), currentTimePos });
        
        if(audio){
            //@ts-ignore
            audio.current.currentTime = currentTime;
        }
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

        audio.current?.addEventListener('progress', handelDownloadProgress);
        audio.current?.addEventListener('ended', () => setPlay(false));

        return () => {
            audio.current?.removeEventListener('progress', handelDownloadProgress);
            audio.current?.removeEventListener('ended', () => setPlay(false));
        }
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
                <div ref={progressBarRef} onMouseDown={handleMouseDownOrTouchStartProgressBar} onTouchStart={handleMouseDownOrTouchStartProgressBar} className = "audio-player-controllers-bar-wrap">
                    <div style = {{width: barProps.currentTimePos}} className = "audio-player-controllers-bar"/>
                    <div className = "audio-player-controllers-download-wrap">
                        {downloadProgress.downloadProgressArr && downloadProgress.downloadProgressArr.map(({ left, width }, i) => (
                            <div 
                                key={i}
                                className = 'audio-player-controllers-download-bar'
                                style={{ left, width, transitionDuration: downloadProgress.hasDownloadProgressAnimation ? '.2s' : '0s' }}
                            />
                        ))}
                    </div>
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