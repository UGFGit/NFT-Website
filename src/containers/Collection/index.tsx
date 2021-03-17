import React, { useEffect, useRef, useState } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import '../../static/styles/collection.scss';
import Footer from '../../components/Footer';
import { ASSETS, ARTISTS } from '../../constants/endpoints';
import { fetch } from '../../libs';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import InfiniteScroll from 'react-infinite-scroller';
import Card from '../../components/TokenCard';
import classNames from 'classnames';
import { useSocket } from '../../socket';
import { SocketEventsEnum } from '../../constants/socket/events';
import CardsTopImage from '../../static/images/cards-top.png';
import CardsBottomImage from '../../static/images/cards-bottom.png';
import DotsImage from '../../static/images/dots.png';
import NoAssets from '../../static/images/no-assets.png';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Lottie from "../../components/Lottie";

const DEFAULT_PAGE_SIZE = 20;

interface IState{
    list: IAsset[];
    load: boolean;
    mimetype: string | null;
    artist: string | null;
}

function Collection(){
    const [state, setState] = useState<IState>({ list: [], load: true, mimetype: null, artist: null });
    const [artistsList, setArtistsList] = useState<{id: string, name: string}[]>([]);

    const socket = useSocket();

    const scrollRef = useRef(null);

    const loadApplication = async (pageNumber = 0) => {
        const response = await fetch.post(ASSETS, { pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber }, filters: { mimetype: state.mimetype, artist: state.artist, onSale: true } });
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

    const loadArtists = async () => {
        const response = await fetch.get(ARTISTS);
        if(response.ok){
            const { artists } = await response.json();
            setArtistsList(artists);
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
                setState({ load: state.load, mimetype: state.mimetype, list , artist: state.artist});
            }
        })

        return () => {
            socket?.removeListener(SocketEventsEnum.ASSET_SOLD);
            socket?.removeListener(SocketEventsEnum.ASSET_UPDATE);
        }
    }, [socket, state])

    useEffect(() => {
        loadArtists();
    }, [])

    const setFilter = (filter: string | null) => () => {
        //@ts-ignore
        scrollRef.current.pageLoaded = -1;
        setState({ mimetype: filter, list: [], load: true, artist: state.artist});
    }

    return(
        <DocumentTitle title="Collection">
            <div className = 'collection-root'>
                <Navigation location={LocationEnum.COLLECTION}/>
                <div className = 'collection-main'>
                    <div className = "collection-main-container">
                        <p className = 'collection-main-container-title'>Genesis Arts</p>
                        <p className = "collection-main-container-text">A music-centric NFTs marketplace hosting rare and collectable digital assets</p>
                        {/* <p className = "collection-main-container-scroll">scroll</p> */}
                    </div>
                    <div className = 'collection-main-bottom'>
                        <img className = "collection-main-bottom-dots" src = {DotsImage}/>
                        <div className = "collection-main-bottom-cards">
                            <img alt ="" src={CardsBottomImage}/>
                        </div>
                    </div>
                    <div className = 'collection-main-top'>
                        <img className = "collection-main-top-dots" src = {DotsImage}/>
                        <div className = "collection-main-top-cards">
                            <img alt = "" src = {CardsTopImage}/>
                        </div>
                    </div>
                </div>
                <div className = "collection-explore-root">
                    <div className = 'collection-explore-wrap'>
                        <p className = "collection-explore-title">Explore</p>
                        <div className = 'collection-explore-filters-wrap'>
                            <div className = 'collection-explore-filters-btn-wrap'>
                                <div className = "collection-explore-filters-btn-group">
                                    <button 
                                        className = {classNames("collection-explore-filter-btn", { "collection-explore-filter-btn-active": state.mimetype === null })} 
                                        onClick = {setFilter(null)}
                                    >All</button>
                                    <button 
                                        className = {classNames("collection-explore-filter-btn", { "collection-explore-filter-btn-active": state.mimetype === 'image' })} 
                                        onClick = {setFilter('image')}
                                    >Art</button>
                                </div>
                                <div className = "collection-explore-filters-btn-group">
                                    <button 
                                        className = {classNames("collection-explore-filter-btn", { "collection-explore-filter-btn-active": state.mimetype === 'audio' })} 
                                        onClick = {setFilter('audio')}
                                    >Music</button>
                                    <button 
                                        className = {classNames("collection-explore-filter-btn", { "collection-explore-filter-btn-active": state.mimetype === 'video' })} 
                                        onClick = {setFilter('video')}
                                    >Video</button>
                                </div>
                            </div>
                            <Select
                                className = "collection-explore-filter-select"
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
                                {artistsList.map(({id, name}) => (
                                    <MenuItem key = {id} value={id}>{name}</MenuItem>
                                ))}
                            </Select>
                        </div>

                        <div className = "collection-explore-scroll-wrap">
                            <InfiniteScroll
                                ref={scrollRef}
                                pageStart={-1}
                                loadMore={loadApplication}
                                hasMore={state.load}
                                loader={<div className="collection-explore-scroll-loader" key={0}><Lottie width={100} height={100}/></div>}
                                useWindow={true}
                            >
                                {(state.list.length > 0 || state.load) && <div className = "collection-explore-cards-wrap">
                                    {state.list.map((item) => (
                                        <Card key = {item.id} asset={item}/>
                                    ))}
                                </div>}
                                {state.list.length === 0 && state.load === false && <div className = "collection-explore-list-empty-wrap">
                                    <div className = "collection-explore-list-empty-img-wrap">
                                        <img alt="" src={NoAssets}/>
                                    </div>
                                    <div className = "collection-explore-list-empty-text-wrap">
                                        <p className = "collection-explore-list-empty-text-title">Items not available</p>
                                        <p className = "collection-explore-list-empty-text-desc">Come back soon!</p>
                                    </div>
                                </div>}
                            </InfiniteScroll>
                            <div className = "collection-explore-footer-wrap">
                                <Footer/>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </DocumentTitle>
    )
}

export default Collection;