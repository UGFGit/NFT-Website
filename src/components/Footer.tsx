import React from 'react';
import '../static/styles/footer.scss';

function Footer(){
    return(
        <div className='footer-root'>
            <div className = 'footer-logo-wrap'>
                <p className='footer-logo-wrap-title'>Genesis arts</p>
                <p className='footer-logo-wrap-by'>by utopia genesis foundation</p>
            </div>
            <p className='footer-title'>© All rights reserved</p>
            <div className='footer-items-wrap'>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
            </div>
        </div>
    )
}

export default Footer;