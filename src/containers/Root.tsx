import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Faq from './Faq';
import Collection from './Collection';
import Application from './Application';
import Artists from './Artists';
import { fetch } from '../libs';
import { HOST_CONFIG } from '../constants/endpoints';
import {connect} from 'react-redux';
import {AnyAction, bindActionCreators, Dispatch} from 'redux';
import { setConfig } from '../actions/config';
import { IConfigState } from '../interfaces/reducers/config.interface';
import ArtistPage from './Artists/ArtistPage';
import Dashboard from './Dashboard';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import NotFoundPage from './NotFoundPage';
import AssetPage from './Asset';
import Progress from '../components/Progress';

interface AppProps{
    setConfig: typeof setConfig;
}

function App({ setConfig }: AppProps) {
    const [loading, setLoading] = useState(true);
    const [config, setStateConfig] = useState<IConfigState>({ main: true });

    const loadConfig = async () => {
        const response = await fetch.get(HOST_CONFIG);
        if(response.ok){
            const body = await response.json();
            setConfig(body);
            setStateConfig(body);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadConfig();
    }, []);

    if(loading){
        return <Progress/>
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => {
                    if(!config.main && config.artist){
                        return <ArtistPage artist={config.artist}/>
                    }

                    return <Collection/>
                }}/>
                <Route component={Faq} path="/faq"/>
                {config.main && <Route component={Application} path="/application"/>}
                {config.main && <Route component={Artists} path="/artists"/>}
                <Route component={Dashboard} path="/dashboard"/>
                <Route component={PrivacyPolicy} path="/privacy-policy"/>
                <Route component={TermsOfService} path="/terms-of-service"/>
                <Route path="/assets/:id" render={({match}) => (
                    <AssetPage
                        assetId = {match.params.id}
                    />
                )}/>
                <Route component={NotFoundPage} path="*"/>
            </Switch>
        </Router>
    );
}

function matchDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return bindActionCreators({
        setConfig
    }, dispatch)
  }
export default connect(null , matchDispatchToProps)(App);
