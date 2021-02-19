import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { FILESTORE } from '../../constants/endpoints';
import Avatar from '@material-ui/core/Avatar';
import '../../static/styles/dialog.scss';
import { IApplication } from '../../interfaces/Application/application.interface';
import AvatarStub from '../../static/images/avatar-stub.jpg';

interface DialogProps{
    application: IApplication;
    open: boolean;
    handleBuy: () => void;
    onClose: () => void;
}

function Dialog({ application , open, handleBuy, onClose}: DialogProps){
    const { nickname, filename, name, price, description, number, cryptoPrice } = application;

    return(
        <MuiDialog className = "dialog-root" open={open} onClose = {onClose}>
            <DialogTitle>
                <div className = "dialog-card-header">
                    <Avatar alt="" src = {AvatarStub}/>
                    <p className = "dialog-card-header-nickname">{nickname}</p>
                    <IconButton style = {{marginLeft: 'auto'}} onClick = {onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div className = 'dialog-content'>
                    <div className = "dialog-content-image-wrap">
                        <img alt = "" src = {FILESTORE(filename)}/>
                    </div>
                    <div className = "dialog-content-text-wrap">
                        <p className = "dialog-content-text-title">{name}</p>
                        <p className = "dialog-content-text-description">{description}</p>
                        <p className = "dialog-content-text-number">1 of {number}</p>
                    </div>
                </div>                    
            </DialogContent>
            <DialogActions className = 'dialog-actions'>
                <div className = "dialog-actions-price-wrap">
                    <p>{cryptoPrice} UOP</p>
                    <p>{price} €</p>
                </div>

                <button onClick = {handleBuy} className = "dialog-actions-buy-btn">Buy</button>
            </DialogActions>
        </MuiDialog>
    )
}

export default Dialog;