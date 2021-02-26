import { WEB3_PROVIDER_REMOVE, WEB3_PROVIDER_SET } from '../constants/actionTypes/web3';
import { IWeb3State } from '../interfaces/reducers/web3.interface';

export const setProvider = (value: IWeb3State) => ({ type: WEB3_PROVIDER_SET, value });

export const removeProvider = () => ({ type: WEB3_PROVIDER_REMOVE });