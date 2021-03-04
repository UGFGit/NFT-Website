import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Faq from './Faq';
import Collection from './Collection';
import Application from './Application';
import Artists from './Artists';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetch } from '../libs';
import { HOST_CONFIG } from '../constants/endpoints';
import {connect} from 'react-redux';
import {AnyAction, bindActionCreators, Dispatch} from 'redux';
import { setConfig } from '../actions/config';
import { IConfigState } from '../interfaces/reducers/config.interface';
import ArtistPage from './Artists/ArtistPage';

interface AppProps{
    setConfig: typeof setConfig;
}

const Progress = () => {
    const style = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={style}>
            <CircularProgress size={80} thickness={5} />
        </div>
    )
};

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
                <Route component={Application} path="/application"/>
                <Route component={Artists} path="/artists"/>
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
