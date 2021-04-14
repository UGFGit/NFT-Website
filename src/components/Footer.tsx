import React from 'react';
import '../static/styles/footer.scss';
import { useHistory } from "react-router-dom";
import EmailIcon from '../static/images/e-mail.png';
import DiscordIcon from '../static/images/discord.png';
import InstagramIcon from '../static/images/instagram.png';
import TwitterIcon from '../static/images/twitter.png';

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
            <div className = "footer-links-root">
                <div className = "footer-links-wrap">
                    <p onClick = {() => history.push('/faq')}>FAQ</p>
                    <p className = "footer-links-center" onClick = {() => history.push('/terms-of-service')}>Terms of Service</p>
                    <p onClick = {() => history.push('/privacy-policy')}>Privacy Policy</p>
                </div>
                <p className='footer-title'>© All rights reserved</p>
            </div>
            <div className='footer-items-wrap-rigth'>
                <a href="https://discord.gg/w8dq7jje" className = "footer-righth-item" target="_blank">
                    <img alt = "" src={DiscordIcon}/>
                </a>
                <a href = "https://www.instagram.com/utopiagenesis/?hl=en" className = "footer-righth-item" target="_blank">
                    <img alt = "" src={InstagramIcon}/>
                </a>
                <a href="https://twitter.com/UtopiaGenesis" className = "footer-righth-item" target="_blank">
                    <img alt = "" src={TwitterIcon}/>
                </a>
                <a href="mailto:legal@utopiagenesis.com" className = "footer-righth-item">
                    <img alt = "" src={EmailIcon}/>
                </a>
            </div>
        </div>
    )
}

export default Footer;