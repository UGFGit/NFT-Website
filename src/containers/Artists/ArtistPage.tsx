import React, { useEffect, useRef, useState } from 'react';
import { IArtist } from '../../interfaces/containers/Artists/artist.interface';
import '../../static/styles/artist-page.scss';
import DocumentTitle from 'react-document-title';
import { useSocket } from '../../socket';
import { SocketEventsEnum } from '../../constants/socket/events';
import InfiniteScroll from 'react-infinite-scroller';
import Card from '../../components/TokenCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { METADATA, FILESTORE } from '../../constants/endpoints';
import { fetch } from '../../libs';
import { IMetadata } from '../../interfaces/containers/Application/metadata.interface';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

interface IArtistProps{
    artist: IArtist
}

const DEFAULT_PAGE_SIZE = 20;

interface IState{
    list: IMetadata[];
    load: boolean;
    mimetype: string | null;
}

function ArtistPage({ artist }: IArtistProps){
    const [state, setState] = useState<IState>({ list: [], load: true, mimetype: 'image' });

    const socket = useSocket();

    const scrollRef = useRef(null);

    const loadApplication = async (pageNumber = 0) => {
        const response = await fetch.post(METADATA, { pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber }, filters: { mimetype: state.mimetype, actist: artist.id } });
        if(response.ok){
            const { metadatas, pagination} = await response.json();
            const list = [...state.list, ...metadatas];
            const newState = { ...state };

            if(list.length === pagination.total || metadatas.length === 0){
                newState.load = false;
                setState(newState);
            }

            setState({...newState, list});
        } else {
            setState({ ...state, load: false });
        }
    }

    useEffect(() => {
        socket?.on(SocketEventsEnum.METADATA_SOLD, ({ id }: {id: string}) => {
            setState({ load: state.load, mimetype: state.mimetype, list: state.list.filter((app) => app.id !== id)});
        })

        return () => {
            socket?.removeListener(SocketEventsEnum.METADATA_SOLD);
        }
    }, [socket, state])

    const setFilter = (filter: string | null) => () => {
        //@ts-ignore
        scrollRef.current.pageLoaded = -1;
        setState({ mimetype: filter, list: [], load: true});
    }
    
    return(
        <DocumentTitle title={artist.name}>
            <div className = "artist-page-root">
                <Navigation/>
                <div className = "artist-page-background">
                    <img alt = "" src = {FILESTORE(artist.background)}/>
                </div>
                <div className = "artist-page-name-wrap">
                    <Avatar alt="" src = {FILESTORE(artist.avatar)}/>
                    <p className = "artist-page-name">{artist.name}</p>
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
                                className = {classNames("artist-page-explore-filter-btn", { "artist-page-explore-filter-btn-active": state.mimetype === 'video' })} 
                                onClick = {setFilter('video')}
                            >Video</button>
                        </div>

                        <div className = "artist-page-explore-scroll-wrap">
                            <InfiniteScroll
                                ref={scrollRef}
                                pageStart={-1}
                                loadMore={loadApplication}
                                hasMore={state.load}
                                loader={<div className="artist-page-explore-scroll-loader" key={0}><CircularProgress size={100} thickness={5} /></div>}
                                useWindow={true}
                            >
                                <div className = "artist-page-explore-cards-wrap">
                                    {state.list.map((item) => (
                                        <Card key = {item.id} metadata={item}/>
                                    ))}
                                </div>
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