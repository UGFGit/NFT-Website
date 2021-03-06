import React, { useEffect, useRef, useState } from 'react';
import { IAsset } from '../../interfaces/containers/Application/asset.interface';
import '../../static/styles/dashboard.scss';
import { ASSETS } from '../../constants/endpoints';
import { fetch } from '../../libs';
import DocumentTitle from 'react-document-title';
import { useSocket } from '../../socket';
import InfiniteScroll from 'react-infinite-scroller';
import Card from '../../components/TokenCard';
import Navigation from '../../components/Navigation';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import UserBanner from '../../static/images/banner-user.jpg';
import UserAvatar from '../../static/images/user-avatar.jpg';
import { SocketEventsEnum } from '../../constants/socket/events';
import Footer from '../../components/Footer';
import { IWeb3State } from '../../interfaces/reducers/web3.interface';
import {connect} from 'react-redux';
import NoAssets from '../../static/images/no-assets.png';
import { useHistory } from "react-router-dom";
import Lottie from "../../components/Lottie";
import { IConfigState } from '../../interfaces/reducers/config.interface';
import MailForm from '../../components/MainForm';

const DEFAULT_PAGE_SIZE = 20;

interface DashboardProps{
    web3: IWeb3State;
    config: IConfigState;
}

interface IState{
    list: IAsset[];
    load: boolean;
    mimetype: string | null;
}

function Dashboard({ web3, config }: DashboardProps){
    const [state, setState] = useState<IState>({ list: [], load: true, mimetype: 'image' });

    const history = useHistory();

    const socket = useSocket();

    const scrollRef = useRef(null);

    const loadApplication = async (pageNumber = 0) => {
        if(!web3.account){
            setState({list: [], load: false, mimetype: state.mimetype});
            return;
        }
        const response = await fetch.post(ASSETS, { pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber }, filters: { mimetype: state.mimetype, address: web3.account, artist: config.main? undefined : config.artist?.id } });
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
            setState({ load: state.load, mimetype: state.mimetype, list: state.list.filter((app) => app.id !== id)});
        })
        
        return () => {
            socket?.removeListener(SocketEventsEnum.ASSET_SOLD);
        }
    }, [socket, state]);

    useEffect(() => {
        //@ts-ignore
        scrollRef.current.pageLoaded = -1;
        setState({ mimetype: state.mimetype, list: [], load: true});
    }, [web3])

    const setFilter = (filter: string | null) => () => {
        //@ts-ignore
        scrollRef.current.pageLoaded = -1;
        setState({ mimetype: filter, list: [], load: true});
    }
    
    return(
        <DocumentTitle title="Dashboard">
            <div className = "dashboard-root">
                <Navigation/>
                <div className = "dashboard-background">
                    <img alt = "" src = {UserBanner}/>
                </div>
                <div className = "dashboard-name-wrap">
                    <Avatar alt="" src = {UserAvatar}/>
                    {web3.account && <p className = "dashboard-name">{`${web3.account.slice(0, 6)}...${web3.account.slice(38)}`}</p>}
                </div>
                <div className = "dashboard-explore-root">
                    <div className = 'dashboard-explore-wrap'>
                        <p className = "dashboard-explore-title">My assets</p>
                        <div className = 'dashboard-explore-filters-wrap'>
                            <button 
                                className = {classNames("dashboard-explore-filter-btn", { "dashboard-explore-filter-btn-active": state.mimetype === 'image' })} 
                                onClick = {setFilter('image')}
                            >Art</button>
                            <button 
                                className = {classNames("dashboard-explore-filter-btn", { "dashboard-explore-filter-btn-active": state.mimetype === 'audio' })} 
                                onClick = {setFilter('audio')}
                            >Music</button>
                            <button 
                                className = {classNames("dashboard-explore-filter-btn", { "dashboard-explore-filter-btn-active": state.mimetype === 'video' })} 
                                onClick = {setFilter('video')}
                            >Video</button>
                        </div>

                        <div className = "dashboard-explore-scroll-wrap">
                            <InfiniteScroll
                                ref={scrollRef}
                                pageStart={-1}
                                loadMore={loadApplication}
                                hasMore={state.load}
                                loader={<div className="dashboard-explore-scroll-loader" key={0}><Lottie width={100} height={100}/></div>}
                                useWindow={true}
                            >
                                {(state.list.length > 0 || state.load) &&<div className = "dashboard-explore-cards-wrap">
                                    {state.list.map((item) => (
                                        <Card key = {item.id} asset={item}/>
                                    ))}
                                </div>}
                                {state.list.length === 0 && state.load === false && <div className = "dashboard-list-empty-wrap">
                                    <div className = "dashboard-list-empty-img-wrap">
                                        <img alt="" src={NoAssets}/>
                                    </div>
                                    <div className = "dashboard-list-empty-text-wrap">
                                        <p className = "dashboard-list-empty-text-title">You haven???t items</p>
                                        <p className = "dashboard-list-empty-text-desc">Come back soon! Or try to browse something for you on our marketplace</p>
                                    </div>
                                    <button onClick = {() => history.push('/')} className = "dashboard-list-empty-btn">Collection</button>
                                </div>}
                            </InfiniteScroll>
                            <MailForm/>
                            <div className = "dashboard-explore-footer-wrap">
                                <Footer/>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </DocumentTitle>
    )
}

function mapStateToProps(state: { web3: IWeb3State, config: IConfigState}) {
    return {
        web3 : state.web3,
        config : state.config,
    }
}

export default connect(mapStateToProps)(Dashboard);