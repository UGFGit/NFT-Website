import React, { useState } from 'react';
import { IApplication } from '../../interfaces/Application/application.interface';
import '../../static/styles/card.scss';
import Avatar from '@material-ui/core/Avatar';
import AvatarStub from '../../static/images/avatar-stub.jpg';
import { FILESTORE } from '../../constants/endpoints';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function Card({ nickname, filename, name, price, description }: IApplication){

    const [open, setOpen ] = useState(false);

    const handleBuy = () => {
        alert("buy");
    }

    return(
        <div>
            <div onClick = {(event: any) => event.target.className !== 'card-body-buy-btn' && setOpen(true)} className = "card-root">
                <div className = "card-header">
                    <Avatar alt="" src = {AvatarStub}/>
                    <p className = "card-nickname">{nickname}</p>
                </div>
                <div className = "card-body">
                    <div className = "card-image-wrap">
                        <img alt = "" src = {FILESTORE(filename)}/>
                    </div>

                    <div className = "card-body-name-wrap">
                        <p className = "card-body-name">{name}</p>
                        <p className = "card-body-name">1 of 1</p>
                    </div>

                    <div className = "card-body-footer">
                        <div className = "card-body-footer-price-wrap">
                            <p>{price} UOP</p>
                            <p>{price} €</p>
                        </div>

                        <button onClick = {handleBuy} className = "card-body-buy-btn">Buy</button>
                    </div>
                </div>            
            </div>
            <Dialog className = "dialog-root" open={open} onClose = {() => setOpen(false)}>
                <DialogTitle>
                    <div className = "dialog-card-header">
                        <Avatar alt="" src = {AvatarStub}/>
                        <p className = "dialog-card-header-nickname">{nickname}</p>
                        <IconButton style = {{marginLeft: 'auto'}} onClick = {() => setOpen(false)}>
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
                            <p className = "dialog-content-text-number">1 of 1</p>
                        </div>
                    </div>                    
                </DialogContent>
                <DialogActions className = 'dialog-actions'>
                    <div className = "dialog-actions-price-wrap">
                        <p>{price} UOP</p>
                        <p>{price} €</p>
                    </div>

                    <button onClick = {handleBuy} className = "dialog-actions-buy-btn">Buy</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Card;