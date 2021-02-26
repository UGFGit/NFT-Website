import { WEB3_PROVIDER_REMOVE, WEB3_PROVIDER_SET } from '../constants/actionTypes/web3';
import { IWeb3State } from '../interfaces/reducers/web3.interface';

const initialState = {
    available: false,
    provider: null,
    network: null,
    account: null
};

export default function (state = initialState, action: { type: string; value: IWeb3State}) {
    switch (action.type) {
        case WEB3_PROVIDER_SET:
            return Object.assign({}, state, action.value);

        case WEB3_PROVIDER_REMOVE:
            return initialState;

        default:
            return state;
    }
}