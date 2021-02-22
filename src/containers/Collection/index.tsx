import React, { useRef, useState } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import '../../static/styles/collection.scss';
import Footer from '../../components/Footer';
import { APPLICATION } from '../../constants/endpoints';
import { fetch } from '../../libs';
import { IApplication } from '../../interfaces/Application/application.interface';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

const DEFAULT_PAGE_SIZE = 3;

interface IState{
    list: IApplication[];
    load: boolean;
    mimetype: string | null;
}

function Collection(){
    const [state, setState] = useState<IState>({ list: [], load: true, mimetype: null });

    const scrollRef = useRef(null);

    const loadApplication = async (pageNumber = 0) => {
        const response = await fetch.post(APPLICATION, { pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber }, filters: { mimetype: state.mimetype } });
        const { applications, pagination} = await response.json();
        const list = [...state.list, ...applications];
        const newState = { ...state };

        if(list.length === pagination.total || applications.length === 0){
            newState.load = false;
            setState(newState);
        }

        setState({...newState, list});
    }

    const setFilter = (filter: string | null) => () => {
        //@ts-ignore
        scrollRef.current.pageLoaded = -1;
        setState({ mimetype: filter, list: [], load: true});
    }
    
    return(
        <DocumentTitle title="Collection">
            <div className = 'collection-root'>
                <Navigation location={LocationEnum.COLLECTION}/>
                <div className = 'collection-main'>
                    <div className = "collection-main-container">
                        <div className = "collection-main-container-title-wrap">
                            <p className = 'collection-main-container-title'>Collect <span>digital</span></p>
                            <p className = 'collection-main-container-title'><span>artworks</span> from <span>artists</span></p>
                        </div>
                        <p className = "collection-main-container-text">NFT stands for non-fungible tokens like ERC-721 (a smart contract standard) tokens which are hosted on Ethereum’s own blockchain.</p>
                        <p className = "collection-main-container-scroll">scroll</p>
                    </div>
                    <div className = 'collection-main-bottom'>
                        <div className = "collection-main-bottom-cards"/>
                    </div>
                    <div className = 'collection-main-top'>
                        <div className = "collection-main-top-cards"/>
                    </div>
                </div>
                <div className = "collection-explore-root">
                    <div className = 'collection-explore-wrap'>
                        <p className = "collection-explore-title">Explore</p>
                        <div className = 'collection-explore-filters-wrap'>
                            <button 
                                className = {classNames("collection-explore-filter-btn", { "collection-explore-filter-btn-active": state.mimetype === null })} 
                                onClick = {setFilter(null)}
                            >All</button>
                            <button 
                                className = {classNames("collection-explore-filter-btn", { "collection-explore-filter-btn-active": state.mimetype === 'image' })} 
                                onClick = {setFilter('image')}
                            >Art</button>
                            <button 
                                className = {classNames("collection-explore-filter-btn", { "collection-explore-filter-btn-active": state.mimetype === 'audio' })} 
                                onClick = {setFilter('audio')}
                            >Music</button>
                        </div>

                        <div className = {classNames("collection-explore-scroll-wrap", { 'empty': state.list.length === 0 })}>
                            <InfiniteScroll
                                ref={scrollRef}
                                pageStart={-1}
                                loadMore={loadApplication}
                                hasMore={state.load}
                                loader={<div className="collection-explore-scroll-loader" key={0}><CircularProgress size={100} thickness={5} /></div>}
                                useWindow={false}
                            >
                                <div className = "collection-explore-cards-wrap">
                                    {state.list.map((item) => (
                                        <Card key = {item.id} {...item}/>
                                    ))}
                                </div>
                            </InfiniteScroll>
                            <div className = {classNames({ "collection-explore-footer-wrap":state.list.length === 0 })}>
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