import React, { useState, useEffect } from 'react';
//@ts-ignore
import checkMetamask, { MetamaskNotFoundError } from '@metamask-checker/core';

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
    
    useEffect(() => {
        return () => removeListeners();
    }, []);
    
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