import { CONFIG_SET } from '../constants/actionTypes/config';
import { IConfigState } from '../interfaces/reducers/config.interface';

export const setConfig = (value: IConfigState) => ({ type: CONFIG_SET, value });