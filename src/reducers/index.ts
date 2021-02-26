import { combineReducers } from 'redux';
import Web3Reducer from './web3';

const allReducers = combineReducers({
    web3: Web3Reducer
});

export default allReducers;