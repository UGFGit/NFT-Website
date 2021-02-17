import React from 'react';
import '../static/styles/footer.scss';

function Footer(){
    return(
        <div className='footer-root'>
            <p className='footer-title'>© 2020 Genesis arts 2020. All rights reserved</p>
            <div className='footer-items-wrap'>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
            </div>
        </div>
    )
}

export default Footer;