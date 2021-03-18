import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import { FILESTORE } from '../../constants/endpoints';
import VideoPlayer from '../../components/VideoPlayer';

interface DialogProps{
    open: boolean;
    onClose: () => void;
    asset: IAsset
}

function Dialog({ open, onClose, asset}: DialogProps){
    return(
        <MuiDialog open={open} onClose = {onClose} >
            <VideoPlayer
                src = {FILESTORE(asset.metadata.filename)}
                muted = {false}
                controls = {true}
                loop = {false}
                playing = {true}
            />  
        </MuiDialog>
    )
}

export default Dialog;