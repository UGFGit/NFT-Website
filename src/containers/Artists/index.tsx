import React, { useState } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import '../../static/styles/artists.scss';
import Footer from '../../components/Footer';
import { IConfigState } from '../../interfaces/reducers/config.interface';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card';
import { fetch } from '../../libs';
import { HOSTS } from '../../constants/endpoints';
import DotsImage from '../../static/images/dots.png';
import NoAssets from '../../static/images/no-assets.png';
import Lottie from "../../components/Lottie";
import MailForm from '../../components/MainForm';

const DEFAULT_PAGE_SIZE = 20;

interface IState{
    list: IConfigState[];
    load: boolean;
    mimetype: string | null;
}

function Artists(){
    const [state, setState] = useState<IState>({ list: [], load: true, mimetype: null });

    const loadApplication = async (pageNumber = 0) => {
        const response = await fetch.post(HOSTS, { pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber }});
        if(response.ok){
            const { hosts, pagination} = await response.json();
            const list = [...state.list, ...hosts];
            const newState = { ...state };

            if(list.length === pagination.total || hosts.length === 0){
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
                        <p className = 'artists-main-container-title'>Digital Collectibles</p>
                        <p className = 'artists-main-container-title'>From The Music World</p>
                    </div>
                    <div className = 'artists-main-bottom'>
                        <img className = "artists-main-bottom-img" alt = "" src = {DotsImage}/>
                    </div>
                    <div className = 'artists-main-top'>
                        <img className = "artists-main-top-img" alt = "" src = {DotsImage}/>
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
                                loader={<div className="artists-explore-scroll-loader" key={0}><Lottie width={100} height={100}/></div>}
                                useWindow={true}
                            >
                                {(state.list.length > 0 || state.load) && <div className = "artists-explore-cards-wrap">
                                    {state.list.map((item) => (
                                        <Card key = {item.id} {...item}/>
                                    ))}
                                </div>}
                                {state.list.length === 0 && state.load === false && <div className = "artists-explore-list-empty-wrap">
                                    <div className = "artists-explore-list-empty-img-wrap">
                                        <img alt="" src={NoAssets}/>
                                    </div>
                                    <div className = "artists-explore-list-empty-text-wrap">
                                        <p className = "artists-explore-list-empty-text-title">Artists list will be updated soon.</p>
                                    </div>
                                </div>}
                            </InfiniteScroll>
                            <MailForm/>
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