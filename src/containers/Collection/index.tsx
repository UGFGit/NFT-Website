import React from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';

function Collection(){
    return(
        <DocumentTitle title="Collection">
            <div>
                <Navigation location={LocationEnum.COLLECTION}/>
            </div>
        </DocumentTitle>
    )
}

export default Collection;