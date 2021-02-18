import React, { useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import '../../static/styles/collection.scss';
import Footer from '../../components/Footer';
import { APPLICATION } from '../../constants/endpoints';
import { fetch } from '../../libs';
import { IApplication } from '../../interfaces/Application/application.interface';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card';

const DEFAULT_PAGE_SIZE = 20;

function Collection(){
    const [list, setList] = useState<IApplication[]>([]);
    const [load, setLoad] = useState(true);

    const loadApplication = async (pageNumber = 0) => {
        const response = await fetch.post(APPLICATION, { pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber }});
        const { applications, pagination } = await response.json();
        console.log(applications, pagination, applications.length)
        if(applications.length === 0){
            setLoad(false);
        }
        setList([...list, ...applications]);
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

                        <div className = "collection-explore-scroll-wrap">
                            <InfiniteScroll
                                pageStart={-1}
                                loadMore={loadApplication}
                                hasMore={load}
                                loader={<div className="loader" key={0}>Loading ...</div>}
                                useWindow={false}
                                className = "collection-explore-cards-wrap"
                            >
                            {list.map((item) => (
                                    <Card key = {item.id} {...item}/>
                                ))}
                            </InfiniteScroll>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </DocumentTitle>
    )
}

export default Collection;