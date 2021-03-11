import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import { FILESTORE } from '../../constants/endpoints';

interface DialogProps{
    open: boolean;
    onClose: () => void;
    asset: IAsset
}

function Dialog({ open, onClose, asset}: DialogProps){
    return(
        <MuiDialog open={open} >
            <DialogTitle style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <IconButton onClick = {onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers style = {{
                padding: "16px 24px"
            }}>
                <div style = {{ width: 489, height: 465 }}>
                    <img style = {{width: '100%'}} alt ="" src ={FILESTORE(asset.metadata.filePlaceholder || asset.metadata.filename)}/>
                </div>               
            </DialogContent>
        </MuiDialog>
    )
}

export default Dialog;