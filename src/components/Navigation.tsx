import React, { useState, useEffect } from 'react';
import '../static/styles/navigation.scss';
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import MetamaskChecker from '../components/MetamaskChecker';
import CloseIcon from '@material-ui/icons/Close';
import DehazeIcon from '@material-ui/icons/Dehaze';
import {connect} from 'react-redux';
import { IConfigState } from '../interfaces/reducers/config.interface';

export enum LocationEnum{
    COLLECTION,
    FAQ,
    APPLICATION,
    ARTISTS
}

interface NavigationProps{
    location?: LocationEnum;
    config: IConfigState
}

function Navigation({ location, config }: NavigationProps){
    const history = useHistory();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, [])

    return(
        <div className= 'navigation-root'>
            <div className = "navigation-title-wrap" onClick = {() => history.push('/')}>
                <div className = 'navigation-logo-wrap'>
                    <p className='navigation-logo-wrap-title'>Genesis arts</p>
                    <p className='navigation-logo-wrap-by'>by utopia genesis foundation</p>
                </div>
                { !config.main && 
                    <div className = "navigation-artist-logo-wrap">
                        <div className = "navigation-artist-logo-cross"/>
                        <p className = "navigation-artist-logo-title">{config.artist?.name}</p>
                    </div>
                }
                <div onClick = {() => setOpen(!open)} className = "navigation-menu-wrap">
                    { open? <CloseIcon style = {{ fontSize: 16, color: "#FFFFFF"}}/> : <DehazeIcon style = {{ fontSize: 24, color: "#FFFFFF"}}/>}
                </div>
            </div>
            <div className={classNames('navigation-wrap', {'open': open } )}>
                { config.main && <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.COLLECTION})} onClick={() => history.push('/')}>Collection</p> }
                { config.main && <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.ARTISTS})} onClick={() => history.push('/artists')}>Artists</p> }
                <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.FAQ})} onClick={() => history.push('/faq')}>Faq</p>
                { config.main && <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.APPLICATION})} onClick={() => history.push('/application')}>Application</p> }

                <MetamaskChecker/>
            </div>
        </div>
    )
}

function mapStateToProps(state: { config: IConfigState}) {
    return {
        config : state.config,
    }
}

export default connect(mapStateToProps)(Navigation);