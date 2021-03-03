import React, { useRef, useState } from 'react';
import '../static/styles/navigation.scss';
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import MetamaskChecker from '../components/MetamaskChecker';
import CloseIcon from '@material-ui/icons/Close';
import DehazeIcon from '@material-ui/icons/Dehaze';

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

    const [open, setOpen] = useState(false);

    return(
        <div className= 'navigation-root'>
            <div className = "navigation-title-wrap">
                <div className = 'navigation-logo-wrap'>
                    <p className='navigation-logo-wrap-title'>Genesis arts</p>
                    <p className='navigation-logo-wrap-by'>by utopia genesis foundation</p>
                </div>
                <div onClick = {() => setOpen(!open)} className = "navigation-menu-wrap">
                    { open? <CloseIcon style = {{ fontSize: 16, color: "#FFFFFF"}}/> : <DehazeIcon style = {{ fontSize: 24, color: "#FFFFFF"}}/>}
                </div>
            </div>
            <div className={classNames('navigation-wrap', {'open': open } )}>
                <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.COLLECTION})} onClick={() => history.push('/')}>Collection</p>
                <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.FAQ})} onClick={() => history.push('/faq')}>Faq</p>
                <p className={classNames('navigation-item', { 'navigation-item-active': location === LocationEnum.APPLICATION})} onClick={() => history.push('/application')}>Application</p>

                <MetamaskChecker/>
            </div>
        </div>
    )
}

export default Navigation;