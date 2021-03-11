import React from 'react';
import CompoundTimer from 'react-compound-timer';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';

interface TimerProps{
    timeEnd: string;
}

function Timer({ timeEnd }: TimerProps){
    const diff = moment({hours: 0}).diff(timeEnd, 'days') * -1;
    const initialTime = new Date(timeEnd).getTime() - Date.now();

    return(
        <div className = "auction-timer-root">
            <div className = "auction-timer-img-wrap">
                <AccessTimeIcon style = {{fontSize: 16}}/>
            </div>
            {diff === 0 && <CompoundTimer
                initialTime={initialTime}
                direction="backward"
                formatValue={(value) => value >= 10 ? `${value}` : `0${value}`}
            >
                <p className = "auction-timer-time">Sale ends today in <CompoundTimer.Hours />:<CompoundTimer.Minutes/>:<CompoundTimer.Seconds/></p>
            </CompoundTimer>}
            {diff > 0 && <p className = "auction-timer-time">Sale ends in {diff} day{diff !== 1? 's': ''} <span className = "auction-timer-time-date">({moment(timeEnd).format('MMMM DD,YYYY')} at {moment(timeEnd).format('h:mma')})</span></p>}
        </div>
    )
}

export default Timer;