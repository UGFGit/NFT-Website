import React, { useState } from 'react';
import { IAsset } from '../interfaces/containers/Application/asset.interface';
import '../static/styles/card.scss';
import Avatar from '@material-ui/core/Avatar';
import { FILESTORE } from '../constants/endpoints';
import {connect} from 'react-redux';
import { IWeb3State } from '../interfaces/reducers/web3.interface';
import Web3 from 'web3';
import { fetch } from '../libs';
import { BLOCKCHAIN_CHARGE } from '../constants/endpoints';
import { ABI } from '../constants/blockchain/abi';
import { useSnackbar } from 'notistack';
//@ts-ignore
import ImageLoader from 'react-load-image';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageNotFound from '../static/images/image-not-found.jpg';
import { useHistory } from "react-router-dom";

const PAYMENT_CONTRACT = '0xd8fAb6FaF352936d8F658E69C4ba531f2F0A92c4';

interface CardProps{
    web3: IWeb3State,
    asset: IAsset
}

function TokenCard({ web3, asset }: CardProps){
    const history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const { artist, metadata, price, cryptoPrice, token, contract } = asset;

    const checkAllowance = async (client:Web3, contractAddress: string) => {
        //@ts-ignore
        const contract = new client.eth.Contract(ABI, PAYMENT_CONTRACT);
        const allowance = await contract.methods.allowance(web3.account, contractAddress).call();
        if(Number(allowance) === 0){
            const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
            const tx = contract.methods.approve(contractAddress, amount);
            const abi = tx.encodeABI();
            const gas = await tx.estimateGas({ from: web3.account });
            const gasPrice = await client.eth.getGasPrice();
            await client.eth.sendTransaction({ from: web3.account, to: PAYMENT_CONTRACT, data: abi,  gas, gasPrice });
            enqueueSnackbar(`Allowance was send`, { variant: 'success' });
        }
        return;
    } 

    const handleBuy = async () => {
        if(web3.available){
            try{
                enqueueSnackbar(`Hurray `, { variant: 'success' });
            } catch(err){
                enqueueSnackbar("Transaction failed", { variant: 'error' });
            }            
        }
    }

    return(
        <div>
            <div onClick = {() => history.push(`/assets/:contract/:id`)} className = "card-root">
                <ImageLoader
                    className = "card-image-wrap"
                    src={FILESTORE(metadata.filePlaceholder || metadata.filename)}
                >
                    <img className = "card-img" alt = "" />
                    <img className = "card-img" alt = "" src = {ImageNotFound} />
                    <div>
                        <CircularProgress size={80} thickness={5} />
                    </div>
                </ImageLoader>
                <div className = "card-body">
                    <div className = "card-body-name-wrap">
                        <p className = "card-body-name">{metadata.name}</p>
                        <p className = "card-body-name">{token.available} of {token.count}</p>
                    </div>
                    <div className = "card-body-user-wrap">
                        <Avatar alt="" src = {FILESTORE(artist.avatar)}/>
                        <p className = "card-nickname">{artist.name}</p>
                    </div>                    
                </div>
                <div className = "card-body-footer">
                    <div className = "card-body-footer-price-wrap">
                        <p>{cryptoPrice} WETH</p>
                        <p>${price}</p>
                    </div>
                </div>        
            </div>
        </div>
    )
}

function mapStateToProps(state: { web3: IWeb3State}) {
    return {
        web3 : state.web3,
    }
}

export default connect(mapStateToProps)(TokenCard);