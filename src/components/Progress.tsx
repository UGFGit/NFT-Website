import React from 'react';
import Lottie from './Lottie';

function Progress(){
    const style = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={style}>
            <Lottie width = {150} height = {150}/>
        </div>
    )
}

export default Progress;