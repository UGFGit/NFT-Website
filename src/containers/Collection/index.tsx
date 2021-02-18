import React from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import '../../static/styles/collection.scss';

function Collection(){
    return(
        <DocumentTitle title="Collection">
            <div className = 'collection-root'>
                <div className = 'collection-main'>
                    <Navigation location={LocationEnum.COLLECTION}/>
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
            </div>
        </DocumentTitle>
    )
}

export default Collection;