import React, { useState } from 'react';
import { IApplication } from '../../interfaces/containers/Application/application.interface';
import '../../static/styles/card.scss';
import Avatar from '@material-ui/core/Avatar';
import AvatarStub from '../../static/images/avatar-stub.jpg';
import { FILESTORE } from '../../constants/endpoints';
import Dialog from './Dialog';
import {connect} from 'react-redux';
import { IWeb3State } from '../../interfaces/reducers/web3.interface';
import Snackbar from '../../components/Snackbar';
import Web3 from 'web3';
import { fetch } from '../../libs';
import { BLOCKCHAIN_CHARGE } from '../../constants/endpoints';

interface CardProps{
    web3: IWeb3State,
    application: IApplication
}

interface SnacbarState{
    open: boolean;
    title?: string;
    severity?: 'success' | 'info' | 'warning' | 'error';
}

function Card({ web3, application }: CardProps){
    const { nickname, filename, name, price, cryptoPrice, tokens } = application;

    const [open, setOpen ] = useState(false);
    const [snackbar, setSnackbar] = useState<SnacbarState>({ open: false });

    const handleBuy = async () => {
        if(web3.available){
            try{
                const client = new Web3(web3.provider);
                const token = tokens.find((token) => !token.sold);
                
                const amount = client.utils.toWei(String(cryptoPrice), 'ether');
                const { transactionHash } = await client.eth.sendTransaction({ from: web3.account, to: token?.owner, value: amount });
                fetch.post(BLOCKCHAIN_CHARGE, { transactionHash, amount, address: web3.account, token: token?.token, tokenId: token?.tokenId});
                setSnackbar({open: true, severity: 'success', title: `Hurray: ${transactionHash}`});
            } catch(err){
                setSnackbar({open: true, severity: 'error', title: err.message});
            }            
        }
    }

    const solted = tokens.filter((token) => !token.sold);

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
                        <p className = "card-body-name">{solted.length} of {tokens.length}</p>
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
            <Snackbar
                open = {snackbar.open}
                handleClose = {() => setSnackbar({ open: false, title: snackbar.title, severity: snackbar.severity })}
                title = {snackbar.title}
                severity = {snackbar.severity}
            />
        </div>
    )
}

function mapStateToProps(state: { web3: IWeb3State}) {
    return {
        web3 : state.web3,
    }
}

export default connect(mapStateToProps)(Card);