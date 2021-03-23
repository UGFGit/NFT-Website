import React from 'react';
import '../static/styles/footer.scss';
import { useHistory } from "react-router-dom";

function Footer(){
    const history = useHistory();

    const handleLogoClick = () => {
        window.location.assign(`https://nft.utopiagenesis.com/`);
    }

    return(
        <div className='footer-root'>
            <div onClick = {handleLogoClick} className = 'footer-logo-wrap'>
                <p className='footer-logo-wrap-title'>Genesis arts</p>
                <p className='footer-logo-wrap-by'>by utopia genesis foundation</p>
            </div>
            <p className='footer-title'>© All rights reserved</p>
            <div className='footer-items-wrap-rigth'>
                <p onClick = {() => history.push('/faq')}>FAQ</p>
                <p onClick = {() => history.push('/terms-of-service')}>Terms of Service</p>
                <p onClick = {() => history.push('/privacy-policy')}>Privacy Policy</p>
                <p><a href="mailto:legal@utopiagenesis.com">Email</a></p>
            </div>
        </div>
    )
}

export default Footer;