import React from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import Footer from '../../components/Footer';

function Application(){
    return(
        <DocumentTitle title="Application">
            <div>
                <Navigation location={LocationEnum.APPLICATION}/>
                <Footer/>
            </div>
        </DocumentTitle>
    )
}

export default Application;