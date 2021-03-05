import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { FILESTORE } from '../constants/endpoints';
import Avatar from '@material-ui/core/Avatar';
import '../static/styles/dialog.scss';
import { IMetadata } from '../interfaces/containers/Application/metadata.interface';

interface DialogProps{
    metadata: IMetadata;
    open: boolean;
    handleBuy: () => void;
    onClose: () => void;
}

function TokenDialog({ metadata , open, handleBuy, onClose}: DialogProps){
    const { artist, filename, name, price, description, cryptoPrice } = metadata;

    return(
        <MuiDialog maxWidth = 'md' className = "dialog-root" open={open} onClose = {onClose}>
            <DialogTitle>
                <div className = "dialog-card-header-wrap">
                    <div className = "dialog-card-header">
                        <Avatar alt="" src = {FILESTORE(artist.avatar)}/>
                        <p className = "dialog-card-header-nickname">{artist.name}</p>
                        <IconButton style = {{marginLeft: 'auto'}} onClick = {onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className = 'dialog-content'>
                    <div className = "dialog-content-image-wrap">
                        <img alt = "" src = {FILESTORE(filename)}/>
                    </div>
                    <div className = "dialog-content-text-wrap">
                        <p className = "dialog-content-text-title">{name}</p>
                        <p className = "dialog-content-text-description">{description}</p>
                    </div>
                </div>                    
            </DialogContent>
            <DialogActions className = 'dialog-actions'>
                <div className = "dialog-actions-price-wrap">
                    <p>{cryptoPrice} UOP</p>
                    <div/>
                    <p>{price} €</p>
                </div>

                <button onClick = {handleBuy} className = "dialog-actions-buy-btn">Buy</button>
            </DialogActions>
        </MuiDialog>
    )
}

export default TokenDialog;