import { CONFIG_SET } from '../constants/actionTypes/config';
import { IConfigState } from '../interfaces/reducers/config.interface';

const initialState = {
    main: true,
    artist: null
};

export default function (state = initialState, action: { type: string; value: IConfigState}) {
    switch (action.type) {
        case CONFIG_SET:
            return Object.assign({}, state, action.value);

        default:
            return state;
    }
}