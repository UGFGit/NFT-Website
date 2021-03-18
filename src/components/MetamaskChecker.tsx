import React, { useState, useEffect } from 'react';
//@ts-ignore
import checkMetamask, { MetamaskNotFoundError } from '@metamask-checker/core';
import Web3 from 'web3';
import useInterval from '../libs/use-interval';
import {connect} from 'react-redux';
import {AnyAction, bindActionCreators, Dispatch} from 'redux';
import { setProvider, removeProvider } from '../actions/web3';
import { ChainNames } from '../constants/blockchain/chain-names';
import WrongNatworkDialog from './WrongNatworkDialog';
import { useHistory } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TooltipImg from '../static/images/tooltip-img.png';

const CURRENT_CHAIN_ID = 4;
const CURRENT_CHAIN_NAME = ChainNames[CURRENT_CHAIN_ID];

interface MetamaskCheckerState{
    provider?: any;
    network?: number;
    account?: string;
}

interface MetamaskCheckerProps{
    setProvider: typeof setProvider;
    removeProvider: typeof removeProvider;
}

function MetamaskChecker({ setProvider, removeProvider }: MetamaskCheckerProps){
    const history = useHistory();

    const [state, setState] = useState<MetamaskCheckerState>({});
    const [chainDialogOpen, setChainDialogOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [ethNotAvaible, setEthNotAvaible] = useState(false);

    const addProviderListeners = (provider: any) => {
        provider
            .on('chainChanged', check)
            .on('accountsChanged', check)
    }

    const removeListeners = (provider?: any) => {
        (provider || state.provider || { removeAllListeners: () => {}}).removeAllListeners();
        removeProvider();
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
            removeListeners(provider);
            addProviderListeners(provider);
        }

        if(!resultError){
            const state = { provider, network: result.selectedNetwork, account: result.selectedAccount };
            setState(state);
            setProvider({ available: true, ...{ provider, network: result.selectedNetwork, account: result.selectedAccount }})
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

        if(!web3){
            setEthNotAvaible(true);
            return;
        }

        setEthNotAvaible(false);

        const addr = await web3.eth.getAccounts();

        const chainId = await web3.eth.getChainId();

        setChainDialogOpen(chainId !== CURRENT_CHAIN_ID);

        if(Array.isArray(addr) && addr.length !== 0 && !state.account){
            check();
        } else{            
            if(state.provider && addr.length === 0){
                setState({});
                removeListeners();
            }
        }
    }; 
    
    useEffect(() => {
        checkConnection();
        return () => removeListeners();
    }, []);

    useInterval(() => checkConnection(), 1000);
    
    return(
        <div>
            <ClickAwayListener onClickAway = {() => setTooltipOpen(false)}>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    title = {
                        <div className = "tooltip-root">
                            <div className = "tooltip-img-wrap">
                                <img alt = "" src = {TooltipImg}/>
                            </div>
                            <p className = "tooltip-title">Select a wallet provider</p>
                            <p className = "tooltip-desc">Such as Google Chrome or Brave browser</p>
                        </div>
                    }
                    onClose={() => setTooltipOpen(false)}
                    open={tooltipOpen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                >
                    <button 
                        className = "connect-button" 
                        onClick={() => {
                            if(ethNotAvaible){
                                return setTooltipOpen(true);
                            }

                            if(!state.account){
                                return check();
                            }
                            
                            history.push('/dashboard');
                        }}
                    >{!state.account? 
                            'Connect wallet': 
                            'Dashboard'
                    }</button>
                </Tooltip>
            </ClickAwayListener>
            <WrongNatworkDialog
                open = {chainDialogOpen}
                network = {CURRENT_CHAIN_NAME}
            />
        </div>
    )
}

function matchDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators({
    setProvider,
    removeProvider
  }, dispatch)
}
export default connect(null , matchDispatchToProps)(MetamaskChecker);