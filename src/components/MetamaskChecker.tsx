import React, { useState, useEffect } from 'react';
//@ts-ignore
import checkMetamask, { MetamaskNotFoundError } from '@metamask-checker/core';
import Web3 from 'web3';
import useInterval from '../libs/use-interval';

interface MetamaskCheckerState{
    provider?: any;
    network?: number;
    account?: string;
}

function MetamaskChecker(){
    const [state, setState] = useState<MetamaskCheckerState>({});

    const addProviderListeners = (provider: any) => {
        provider
            .on('chainChanged', check)
            .on('accountsChanged', check)
    }

    const removeListeners = (provider?: any) => {
        (provider || state.provider || { removeAllListeners: () => {}}).removeAllListeners();
    }

    const check = async () => {
        let result = {} as any;
        let resultError = null;
        let provider = null;        
        try{
            //@ts-ignore
            result = await checkMetamask(window.ethereum);
        } catch(err){
            console.log(err);
            resultError = err;
            removeListeners(provider);
            setState({ });
        }

        if (! (resultError instanceof MetamaskNotFoundError)) {
            //@ts-ignore
            provider = window.ethereum;
            removeListeners(provider)
            addProviderListeners(provider)
        }

        if(!resultError){
            setState({ provider, network: result.selectedNetwork, account: result.selectedAccount });
        }
    }

    const checkConnection = async () => {
        let web3: any;
        //@ts-ignore
        if (window.ethereum) {
            //@ts-ignore
            web3 = new Web3(window.ethereum);
            //@ts-ignore
        } else if (window.web3) {
            //@ts-ignore
            web3 = new Web3(window.web3.currentProvider);
        };

        const addr = await web3.eth.getAccounts();

        if(Array.isArray(addr) && addr.length !== 0){
            check();
        } else{
            
            if(state.provider && addr.length === 0){
                setState({});
            }
        }
    }; 
    
    useEffect(() => {
        checkConnection();
        return () => removeListeners();
    }, []);

    useInterval(() => checkConnection(), 1000);
    
    return(
        <button 
            className = "connect-button" 
            onClick={check}
            disabled = {Boolean(state.account)}
        >{!state.account? 
                'Connect wallet': 
                `${state.account.slice(0, 6)}...${state.account.slice(38)}`
        }</button>
    )
}

export default MetamaskChecker;