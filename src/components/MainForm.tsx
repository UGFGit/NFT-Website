import React, { useRef, useState, useEffect } from 'react';
import '../static/styles/mail-form.scss';
import ArrowRightIcon from '../static/images/ic_arrow_forward_48px.png';

const url = 'https://utopiagenesis.us7.list-manage.com/subscribe/post?u=c7900b4f3a5493c66096dc424&amp;id=a7b133effa';

function MailForm(){
    const formBody = useRef<any>(null);
    const [size, setSize] = useState(54);

    useEffect(() => {
        const { height } = formBody.current.getBoundingClientRect();

        setSize(height);
        
    }, [formBody])

    return(
        <div className = "mail-form-root">
            <form action={`${url}`} method="post" target="_blank" noValidate className = "mail-form-wrap">
                <p className = "mail-form-title">Subscribe to our newsletter</p>
                <div ref={formBody} className = "mail-form-body-root">
                    <div className = "mail-form-body-wrap">
                        <input autoComplete='off' className = "mail-form-input" type="email" name="EMAIL" placeholder="Email"/>
                        <button style = {{height: size, width: size}} type='submit' className = "mail-form-btn">
                            <img alt="" src = {ArrowRightIcon}/>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MailForm;