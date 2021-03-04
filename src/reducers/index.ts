import { combineReducers } from 'redux';
import Web3Reducer from './web3';
import ConfigReducer from './config';

const allReducers = combineReducers({
    web3: Web3Reducer,
    config: ConfigReducer
});

export default allReducers;