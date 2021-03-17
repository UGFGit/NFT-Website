import React, { useEffect, useState } from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { CRYPTO_COMPARE, ASSET_BID_MAX_BID } from '../../constants/endpoints';
import { fetch } from '../../libs';
import classNames from 'classnames'
import { IWeb3State } from '../../interfaces/reducers/web3.interface';
import { checkBalance } from './blockchain';
import Web3 from 'web3';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import DialogActions from '@material-ui/core/DialogActions';
import Input from '../../components/Input';

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

    const disableButton = !Boolean(price) || Number(price) > balance || Number(price) < maxBid || Number(price) === maxBid || asset.owner === web3.account;

    return(
        <MuiDialog maxWidth='md' open={open} className = "place-bid-dialog-root">
            <DialogTitle className = "place-bid-dialog-title-root">
                <div className = "place-bid-dialog-title-wrap">
                    <p>Place a bid</p>
                    <IconButton className = "place-bid-dialog-title-wrap-btn" onClick = {onClose}>
                        <CloseIcon style = {{fontSize: 16}} />
                    </IconButton>
                </div>                
            </DialogTitle>
            <DialogContent className = "place-bid-dialog-content-root">
                <p className = "place-bid-dialog-content-balance">Balance: {balance} WETH</p>
                <div className = 'place-bid-dialog-content-prices-wrap'>
                    <Input
                        lable = "Price (WETH)"
                        value = {price}
                        onChange= {(value) => {
                            setPice(value);
                            loadBalance();
                            loadMaxBid();
                        }}
                        placeholder = "Amount"
                        type = 'number'
                        error = {Number(price) > balance ? "Not enough WETH to place bid": ''}
                        min={0}
                    />
                    <Input
                        lable = "Price ($)"
                        value = {(Number(price) * prices.WETH.USD).toFixed(2)}
                        placeholder = "Amount"
                        type = 'number'
                        disabled
                    />
                </div>
            </DialogContent>
            <DialogActions className = "place-bid-dialog-actions-root">
                <div className = "place-bid-dialog-actions-wrap">
                    <button onClick = {() => handleBuy(Number(price))} disabled={disableButton} className = {classNames("place-bid-dialog-actions-big-btn", { 'place-bid-dialog-actions-big-btn-disable': disableButton })}>Place bid</button>  
                </div>
            </DialogActions>
        </MuiDialog>
    )

}

export default PlaceBidDialog;