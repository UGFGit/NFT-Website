import { IArtist } from "../containers/Artists/artist.interface";

export interface IConfigState{
    main: boolean;
    artist?: IArtist;
}