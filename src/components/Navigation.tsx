import React, { useRef } from 'react';
import '../static/styles/navigation.scss';
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import MetamaskChecker from '../components/MetamaskChecker';

export enum LocationEnum{
    COLLECTION,
    FAQ,
    APPLICATION
}

interface NavigationProps{
    location: LocationEnum;
}

function Navigation({ location }: NavigationProps){
    const history = useHistory();

    return(
        <div className= 'navigation-root'>
            <p className='navigation-title'>Genesis arts</p>
            <div className='navigation-wrap'>
                <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.COLLECTION})} onClick={() => history.push('/')}>Collection</p>
                <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.FAQ})} onClick={() => history.push('/faq')}>Faq</p>
                <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.APPLICATION})} onClick={() => history.push('/application')}>Application</p>

                <MetamaskChecker/>
            </div>
        </div>
    )
}

export default Navigation;