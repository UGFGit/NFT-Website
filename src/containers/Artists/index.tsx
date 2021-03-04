import React, { useState } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import '../../static/styles/artists.scss';
import Footer from '../../components/Footer';
import { IArtist } from '../../interfaces/containers/Artists/artist.interface';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetch } from '../../libs';
import { ARTISTS } from '../../constants/endpoints';

const DEFAULT_PAGE_SIZE = 20;

interface IState{
    list: IArtist[];
    load: boolean;
    mimetype: string | null;
}

function Artists(){
    const [state, setState] = useState<IState>({ list: [], load: true, mimetype: null });

    const loadApplication = async (pageNumber = 0) => {
        const response = await fetch.post(ARTISTS, { pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber }});
        if(response.ok){
            const { artists, pagination} = await response.json();
            const list = [...state.list, ...artists];
            const newState = { ...state };

            if(list.length === pagination.total || artists.length === 0){
                newState.load = false;
                setState(newState);
            }

            setState({...newState, list});
        } else {
            setState({ ...state, load: false });
        }
    }

    return(
        <DocumentTitle title="Artists">
            <div className = 'artists-root'>
                <Navigation location={LocationEnum.ARTISTS}/>
                <div className = 'artists-main'>
                    <div className = "artists-main-container">
                        <p className = 'artists-main-container-title'>Digital items from the music world</p>
                        <p className = "artists-main-container-text">NFT stands for non-fungible tokens like ERC-721 (a smart contract standard) tokens which are hosted on Ethereum’s own blockchain.</p>
                    </div>
                    <div className = 'artists-main-bottom'>
                        <div className = "artists-main-bottom-cards"/>
                    </div>
                    <div className = 'artists-main-top'>
                        <div className = "artists-main-top-cards"/>
                    </div>
                </div>
                <div className = "artists-explore-root">
                    <div className = 'artists-explore-wrap'>
                        <p className = "artists-explore-title">Explore</p>
                        <div className = "artists-explore-scroll-wrap">
                            <InfiniteScroll
                                pageStart={-1}
                                loadMore={loadApplication}
                                hasMore={state.load}
                                loader={<div className="artists-explore-scroll-loader" key={0}><CircularProgress size={100} thickness={5} /></div>}
                                useWindow={true}
                            >
                                <div className = "artists-explore-cards-wrap">
                                    {state.list.map((item) => (
                                        <Card key = {item.id} {...item}/>
                                    ))}
                                </div>
                            </InfiniteScroll>
                            <div className = "artists-explore-footer-wrap">
                                <Footer/>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </DocumentTitle>
    )
}

export default Artists;