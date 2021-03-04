import React, { useState } from 'react';
import { IMetadata } from '../interfaces/containers/Application/metadata.interface';
import '../static/styles/card.scss';
import Avatar from '@material-ui/core/Avatar';
import { FILESTORE } from '../constants/endpoints';
import Dialog from './TokenDialog';
import {connect} from 'react-redux';
import { IWeb3State } from '../interfaces/reducers/web3.interface';
import Web3 from 'web3';
import { fetch } from '../libs';
import { BLOCKCHAIN_CHARGE } from '../constants/endpoints';
import { ABI } from '../constants/blockchain/abi';
import { useSnackbar } from 'notistack';

const PAYMENT_CONTRACT = '0xd8fAb6FaF352936d8F658E69C4ba531f2F0A92c4';

interface CardProps{
    web3: IWeb3State,
    metadata: IMetadata
}

function TokenCard({ web3, metadata }: CardProps){
    const { enqueueSnackbar } = useSnackbar();

    const { artist, filename, name, price, cryptoPrice, tokens } = metadata;

    const [open, setOpen ] = useState(false);

    const handleBuy = async () => {
        if(web3.available){
            try{
                const client = new Web3(web3.provider);
                const token = tokens.find((token) => !token.sold);
                
                //@ts-ignore
                const contract = new client.eth.Contract(ABI, PAYMENT_CONTRACT);
                const decimal = await contract.methods.decimals().call();
                const amount = `${cryptoPrice * Math.pow(10, decimal)}`;
                const tx = contract.methods.transfer(token?.owner, amount);
                const abi = tx.encodeABI();
                const gas = await tx.estimateGas({ from: web3.account });
                const gasPrice = await client.eth.getGasPrice();

                const { transactionHash } = await client.eth.sendTransaction({ from: web3.account, to: PAYMENT_CONTRACT, data: abi,  gas, gasPrice });
                enqueueSnackbar(`Hurray: ${transactionHash}`, { variant: 'success' });
                setOpen(false);
                fetch.post(BLOCKCHAIN_CHARGE, { transactionHash, amount, address: web3.account, contract: token?.contract, tokenId: token?.tokenId});
            } catch(err){
                enqueueSnackbar(err.message, { variant: 'error' });
            }            
        }
    }

    const solted = tokens.filter((token) => !token.sold);

    return(
        <div>
            <div onClick = {(event: any) => event.target.className !== 'card-body-buy-btn' && setOpen(true)} className = "card-root">
                <div className = "card-image-wrap">
                    <img alt = "" src = {FILESTORE(filename)}/>
                </div>
                <div className = "card-body">
                    <div className = "card-body-name-wrap">
                        <p className = "card-body-name">{name}</p>
                        <p className = "card-body-name">{solted.length} of {tokens.length}</p>
                    </div>
                    <div className = "card-body-user-wrap">
                        <Avatar alt="" src = {FILESTORE(artist.avatar)}/>
                        <p className = "card-nickname">{artist.name}</p>
                    </div>                    
                </div>
                <div className = "card-body-footer">
                    <div className = "card-body-footer-price-wrap">
                        <p>{cryptoPrice} UOP</p>
                        <p>{price} €</p>
                    </div>
                </div>        
            </div>
            <Dialog
                metadata = {metadata}
                open = {open}
                handleBuy = {handleBuy}
                onClose = {() => setOpen(false)}
            />
        </div>
    )
}

function mapStateToProps(state: { web3: IWeb3State}) {
    return {
        web3 : state.web3,
    }
}

export default connect(mapStateToProps)(TokenCard);