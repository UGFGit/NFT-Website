import React, { useState } from 'react';
import { IApplication } from '../../interfaces/Application/application.interface';
import '../../static/styles/card.scss';
import Avatar from '@material-ui/core/Avatar';
import AvatarStub from '../../static/images/avatar-stub.jpg';
import { FILESTORE } from '../../constants/endpoints';
import Dialog from './Dialog';

function Card(application: IApplication){
    const { nickname, filename, name, price, number, cryptoPrice } = application;

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
                        <p className = "card-body-name">1 of {number}</p>
                    </div>

                    <div className = "card-body-footer">
                        <div className = "card-body-footer-price-wrap">
                            <p>{cryptoPrice} UOP</p>
                            <p>{price} €</p>
                        </div>

                        <button onClick = {handleBuy} className = "card-body-buy-btn">Buy</button>
                    </div>
                </div>            
            </div>
            <Dialog
                application = {application}
                open = {open}
                handleBuy = {handleBuy}
                onClose = {() => setOpen(false)}
            />
        </div>
    )
}

export default Card;