import { IArtist } from "../containers/Artists/artist.interface";

export interface IConfigState{
    main: boolean;
    host?: string;
    id?: string;
    multiple?: boolean;
    name?: string;
    banner?: string;
    avatar?: string;
    artist?: IArtist;
}