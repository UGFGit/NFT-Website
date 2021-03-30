import React, { useEffect, useRef, useState } from 'react';
import { IConfigState } from '../../interfaces/reducers/config.interface';
import '../../static/styles/artist-page.scss';
import DocumentTitle from 'react-document-title';
import { useSocket } from '../../socket';
import { SocketEventsEnum } from '../../constants/socket/events';
import InfiniteScroll from 'react-infinite-scroller';
import Card from '../../components/TokenCard';
import { ASSETS, FILESTORE } from '../../constants/endpoints';
import { fetch } from '../../libs';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import NoAssets from '../../static/images/no-assets.png';
import Lottie from "../../components/Lottie";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface IArtistProps{
    config: IConfigState
}

const DEFAULT_PAGE_SIZE = 20;

interface IState{
    list: IAsset[];
    load: boolean;
    mimetype: string | null;
    artist: string | null;
}

function ArtistPage({ config }: IArtistProps){
    //@ts-ignore
    const [state, setState] = useState<IState>({ list: [], load: true, mimetype: 'image', artist: config.multiple? null : config.artist?.id });

    const socket = useSocket();

    const scrollRef = useRef(null);

    const loadApplication = async (pageNumber = 0) => {
        const data = { 
            pagination: { 
                pageSize: DEFAULT_PAGE_SIZE, 
                pageNumber 
            }, 
            filters: { 
                mimetype: state.mimetype, 
                artist: state.artist, 
                artists: config.artistsFilter ? config.artistsFilter.map(({id}) => id): null, 
                onSale: true 
            } 
        };

        const response = await fetch.post(ASSETS, data);
        if(response.ok){
            const { assets, pagination} = await response.json();
            const list = [...state.list, ...assets];
            const newState = { ...state };

            if(list.length === pagination.total || assets.length === 0){
                newState.load = false;
                setState(newState);
            }

            setState({...newState, list});
        } else {
            setState({ ...state, load: false });
        }
    }

    useEffect(() => {
        socket?.on(SocketEventsEnum.ASSET_SOLD, ({ id }: {id: string}) => {
            setState({ load: state.load, mimetype: state.mimetype, list: state.list.filter((app) => app.id !== id), artist: state.artist});
        })

        socket?.on(SocketEventsEnum.ASSET_UPDATE, (newAsset: IAsset) => {
            const assetIndex = state.list.findIndex((asset) => newAsset.id === asset.id);
            if(assetIndex !== -1){
                const list = [...state.list];
                list[assetIndex] = newAsset;
                setState({ load: state.load, mimetype: state.mimetype, list, artist: state.artist});
            }
        })

        return () => {
            socket?.removeListener(SocketEventsEnum.ASSET_SOLD);
            socket?.removeListener(SocketEventsEnum.ASSET_UPDATE);
        }
    }, [socket, state])

    const setFilter = (filter: string | null) => () => {
        //@ts-ignore
        scrollRef.current.pageLoaded = -1;
        setState({ mimetype: filter, list: [], load: true, artist: state.artist});
    }
    
    return(
        // @ts-ignore
        <DocumentTitle title={config.multiple? config.name : config.artist?.name}>
            <div className = "artist-page-root">
                <Navigation/>
                <div className = "artist-page-background">
                    {/* @ts-ignore */}
                    <img alt = "" src = {FILESTORE(config.multiple? config.banner : config.artist?.background)}/>
                </div>
                <div className = "artist-page-name-wrap">
                    {/* @ts-ignore */}
                    <Avatar alt="" src = {FILESTORE(config.multiple? config.avatar : config.artist?.avatar)}/>
                    {/* @ts-ignore */}
                    <p className = "artist-page-name">{config.multiple? config.name : config.artist?.name}</p>
                </div>
                <div className = "artist-page-explore-root">
                    <div className = 'artist-page-explore-wrap'>
                        <p className = "artist-page-explore-title">Explore</p>
                        <div className = 'artist-page-explore-filters-wrap'>
                            <button 
                                className = {classNames("artist-page-explore-filter-btn", { "artist-page-explore-filter-btn-active": state.mimetype === 'image' })} 
                                onClick = {setFilter('image')}
                            >Art</button>
                            <button 
                                className = {classNames("artist-page-explore-filter-btn", { "artist-page-explore-filter-btn-active": state.mimetype === 'audio' })} 
                                onClick = {setFilter('audio')}
                            >Music</button>
                            <button 
                                className = {classNames("artist-page-explore-filter-btn", { "artist-page-explore-filter-btn-active": state.mimetype === 'video' })} 
                                onClick = {setFilter('video')}
                            >Video</button>

                            {config.artistsFilter && <Select
                                className = "artist-page-explore-filter-select"
                                value={state.artist || "placeholder"}
                                //@ts-ignore
                                onChange={(event) => {
                                    //@ts-ignore
                                    scrollRef.current.pageLoaded = -1;
                                    //@ts-ignore
                                    setState({ mimetype: state.mimetype, list: [], load: true, artist: event.target.value !== "placeholder"? event.target.value: null });
                                }}
                                disableUnderline = {true}    
                                MenuProps={{
                                    getContentAnchorEl: null,
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }
                                }}                            
                            >
                                <MenuItem value="placeholder">
                                    Choose artist
                                </MenuItem>
                                {config.artistsFilter.map(({id, name}) => (
                                    <MenuItem key = {id} value={id}>{name}</MenuItem>
                                ))}
                            </Select>}
                        </div>

                        <div className = "artist-page-explore-scroll-wrap">
                            <InfiniteScroll
                                ref={scrollRef}
                                pageStart={-1}
                                loadMore={loadApplication}
                                hasMore={state.load}
                                loader={<div className="artist-page-explore-scroll-loader" key={0}><Lottie width={100} height={100}/></div>}
                                useWindow={true}
                            >
                                {(state.list.length > 0 || state.load) && <div className = "artist-page-explore-cards-wrap">
                                    {state.list.map((item) => (
                                        <Card key = {item.id} asset={item}/>
                                    ))}
                                </div>}
                                {state.list.length === 0 && state.load === false && <div className = "artist-page-explore-list-empty-wrap">
                                    <div className = "artist-page-explore-list-empty-img-wrap">
                                        <img alt="" src={NoAssets}/>
                                    </div>
                                    <div className = "artist-page-explore-list-empty-text-wrap">
                                        <p className = "artist-page-explore-list-empty-text-title">This collection will be updated soon.</p>
                                    </div>
                                </div>}
                            </InfiniteScroll>
                            <div className = "artist-page-explore-footer-wrap">
                                <Footer/>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </DocumentTitle>
    )
}

export default ArtistPage;