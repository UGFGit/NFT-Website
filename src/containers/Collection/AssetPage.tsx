import React from 'react';
import '../../static/styles/metadata-page.scss';
import DocumentTitle from 'react-document-title';

interface AssetPageProps{
    contract: string;
    tokenId: string;
}

function AssetPage({ contract, tokenId }: AssetPageProps){
    return (
        <DocumentTitle title="Dashboard">
            <div className = "metadata-page-root">

            </div>
        </DocumentTitle>
    )
}

export default AssetPage;