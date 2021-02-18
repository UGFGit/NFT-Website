import React from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../../static/styles/faq.scss';
import Accordion from '../../components/Accordion';

function Faq(){
    return(
        <DocumentTitle title="Faq">
            <div className = "faq-root">
                <Navigation location = {LocationEnum.FAQ}/>
                <div className = "faq-body">
                    <p className='title'>Frequently Asked Questions</p>

                    <div className = "accordion-wrap">
                        <Accordion
                            title = "Frequently asked questions"
                            text = {`On the Free plan, if you have the option to edit messages, only the most recent version will remain. On paid plans, Workspace Owners or Admins can choose to keep a log of all edited messages. Visit your Workspace Settings to confirm which option your workspace has enabled. 
                                On the Free plan, if you have the option to edit messages, only the most recent version will remain. On paid plans, Workspace Owners or Admins can choose to keep a log of all edited messages. Visit your Workspace Settings to confirm which option your workspace has enabled. 
                                We are proud to exceed the industry standard when it comes to protecting your organization and we've outlined many of our security practices and certifications on our website.
                            `}
                        />
                        <Accordion
                            title = "Frequently asked questions"
                            text = {`On the Free plan, if you have the option to edit messages, only the most recent version will remain. On paid plans, Workspace Owners or Admins can choose to keep a log of all edited messages. Visit your Workspace Settings to confirm which option your workspace has enabled. 
                                On the Free plan, if you have the option to edit messages, only the most recent version will remain. On paid plans, Workspace Owners or Admins can choose to keep a log of all edited messages. Visit your Workspace Settings to confirm which option your workspace has enabled. 
                                We are proud to exceed the industry standard when it comes to protecting your organization and we've outlined many of our security practices and certifications on our website.
                            `}
                        />
                        <Accordion
                            title = "Frequently asked questions"
                            text = {`On the Free plan, if you have the option to edit messages, only the most recent version will remain. On paid plans, Workspace Owners or Admins can choose to keep a log of all edited messages. Visit your Workspace Settings to confirm which option your workspace has enabled. 
                                On the Free plan, if you have the option to edit messages, only the most recent version will remain. On paid plans, Workspace Owners or Admins can choose to keep a log of all edited messages. Visit your Workspace Settings to confirm which option your workspace has enabled. 
                                We are proud to exceed the industry standard when it comes to protecting your organization and we've outlined many of our security practices and certifications on our website.
                            `}
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        </DocumentTitle>
    )
}

export default Faq;