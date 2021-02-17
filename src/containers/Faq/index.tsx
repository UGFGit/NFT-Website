import React from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import Footer from '../../components/Footer';

function Faq(){
    return(
        <DocumentTitle title="Faq">
            <div>
                <Navigation location = {LocationEnum.FAQ}/>
                <Footer/>
            </div>
        </DocumentTitle>
    )
}

export default Faq;