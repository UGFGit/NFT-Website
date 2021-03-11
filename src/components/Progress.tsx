import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

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
            <CircularProgress size={80} thickness={5} />
        </div>
    )
}

export default Progress;