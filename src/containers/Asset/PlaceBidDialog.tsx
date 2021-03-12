import React, { useEffect, useState } from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { CRYPTO_COMPARE, ASSET_BID_MAX_BID } from '../../constants/endpoints';
import { fetch } from '../../libs';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames'
import { IWeb3State } from '../../interfaces/reducers/web3.interface';
import { checkBalance } from './blockchain';
import Web3 from 'web3';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';

interface IPrices{
    [key: string]: {
        [key: string]: number
    }
}

interface DialogProps{
    open: boolean;
    onClose: () => void;
    web3: IWeb3State;
    paymentAddress: string;
    handleBuy: (price: number) => void;
    asset: IAsset
}

function PlaceBidDialog({ open, onClose, web3, paymentAddress, handleBuy, asset }: DialogProps){
    const [prices, setPices] = useState<IPrices>({ WETH: { USD: 0 }});
    const [balance, setBalance] = useState(0);

    const [maxBid, setMaxBid] = useState(0);

    const [price, setPice] = useState('');

    const loadPrices = async () => {
        const response = await fetch.get(CRYPTO_COMPARE);
        if(response.ok){
            const body = await response.json();
            setPices(body);
        }
    }

    const loadBalance = async () => {
        if(web3.available){
            const client = new Web3(web3.provider);
            const accountBalance = await checkBalance(client, paymentAddress, web3.account);
            setBalance(accountBalance)
        }
    }

    const loadMaxBid = async (firstload = false) => {
        const response = await fetch.post(ASSET_BID_MAX_BID, { assetId: asset.id });
        if(response.ok){
            const { value } = await response.json();
            if(firstload){
                setPice(value)
            }
            setMaxBid(value);
        }
    }

    useEffect(() => {
        loadPrices();
        loadMaxBid(true);
    }, []);

    useEffect(() => {
        loadBalance();
    }, [web3]);

    const disableButton = !Boolean(price) || Number(price) > balance || Number(price) < maxBid || Number(price) === maxBid;

    return(
        <MuiDialog maxWidth='md' open={open} className = "place-bid-dialog-root">
            <DialogTitle className = "place-bid-dialog-title">
                <IconButton onClick = {onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className = "place-bid-dialog-content" dividers style = {{
                padding: "16px 24px"
            }}>
                <p className = "place-bid-dialog-content-title">Place a bid</p> 
                <div className = "place-bid-dialog-content-balance-wrap">
                    <p className = "place-bid-dialog-content-balance-title">Price</p>
                    <p className = "place-bid-dialog-content-balance-balance">Balance: {balance} WETH</p>
                </div>
                <div className = "place-bid-dialog-content-prices-wrap">
                    <div className = "place-bid-dialog-content-prices-crypto-price-wrap">
                        <p>WETH</p>
                    </div>
                    <TextField
                        value = {price}
                        fullWidth
                        style = {{
                            margin: 'auto',
                            padding: '0px 5px'
                        }}
                        InputProps={{
                            disableUnderline: true
                        }}
                        onChange = {(event) => {
                            setPice(event.target.value);
                            loadBalance();
                            loadMaxBid();
                        }}
                    />
                    <div className = "place-bid-dialog-content-prices-price-wrap">
                        <p>${(Number(price) * prices.WETH.USD).toFixed(2)}</p>
                    </div>
                </div>   

                <button onClick = {() => handleBuy(Number(price))} disabled={disableButton} className = {classNames("place-bid-dialog-content-big-btn", { 'place-bid-dialog-content-big-btn-disable': disableButton })}>Place bid</button>  
            </DialogContent>
        </MuiDialog>
    )

}

export default PlaceBidDialog;