import React from 'react';
import '../../static/styles/not-found-page.scss';
import DocumentTitle from 'react-document-title';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

function NotFoundPage(){
    return(
        <DocumentTitle title="404">
            <div className = "not-found-page-root">
                <Navigation/>
                <div className = "not-found-page-body">
                    <p className = "not-found-page-title">404</p>
                    <p className = 'not-found-page-text'>ooops, something went wrong</p>
                </div>
                <div className = "not-found-page-footer-wrap">
                    <Footer/>
                </div>
            </div>
        </DocumentTitle>
    )
}

export default NotFoundPage;