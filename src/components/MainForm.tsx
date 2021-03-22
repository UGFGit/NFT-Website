import React from 'react';
import '../static/styles/mail-form.scss';

const url = 'https://utopiagenesis.us7.list-manage.com/subscribe/post?u=c7900b4f3a5493c66096dc424&amp;id=a7b133effa';

function MailForm(){
    return(
        <div className = "mail-form-root">
            <form action={`${url}`} method="post" target="_blank" noValidate className = "mail-form-wrap">
                <p className = "mail-form-title">Subscribe to our mailing list for updates</p>
                <div className = "mail-form-body-wrap">
                    <input className = "mail-form-input" type="email" name="EMAIL" placeholder="Email"/>
                    <button type='submit' className = "mail-form-btn">Subscribe</button>
                </div>
            </form>
        </div>
    )
}

export default MailForm;