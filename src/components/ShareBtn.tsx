import React from 'react';
import ShareDisableIcon from '../static/images/share-disable.png';
import ShareActiveIcon from '../static/images/share-active.png';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import EmailIcon from '../static/images/email-icon.png';
import LinkIcon from '../static/images/link-icon.png';
import FacebookIcon from '../static/images/facebook-icon.png';
import TelegramIcon from '../static/images/telegram-icon.png';
import TwitterIcon from '../static/images/twitter-icon.png';
import Tooltip from '@material-ui/core/Tooltip';
import { useSnackbar } from 'notistack';
import '../static/styles/share.scss';

interface IShareProps{
    open: boolean;
    handleClose: () => void;
    name: string;
}

function Share({ open, handleClose, name }: IShareProps){
    const { enqueueSnackbar } = useSnackbar();

    return (
        <div className = "share-root">
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                placement = 'bottom-end'
                title = {
                    <div 
                        className = "share-tooltip-root"
                        style = {{
                            gridTemplateColumns: 'repeat(5, 1fr)',
                        }}
                    >
                        <div className = "share-tooltip-item">
                            <FacebookShareButton
                                url = {window.location.href}
                                quote = {name}
                            >
                                <div className = "share-tooltip-item-img-wrap">
                                    <img alt = "" src = {FacebookIcon}/>
                                </div>
                            </FacebookShareButton>
                            <p>Facebook</p>
                        </div>
                        <div className = "share-tooltip-item">
                            <TwitterShareButton
                                url = {window.location.href}
                                title = {name}
                            >
                                <div className = "share-tooltip-item-img-wrap">
                                    <img alt = "" src = {TwitterIcon}/>
                                </div>
                            </TwitterShareButton>
                            <p>Twitter</p>
                        </div>
                        <div className = "share-tooltip-item">
                            <TelegramShareButton
                                url = {window.location.href}
                                title = {name}
                            >
                                <div className = "share-tooltip-item-img-wrap">
                                    <img alt = "" src = {TelegramIcon}/>
                                </div>
                            </TelegramShareButton>
                            <p>Telegram</p>
                        </div>
                        <div className = "share-tooltip-item">
                            <EmailShareButton
                                url={window.location.href}
                                subject = {name}
                                body = {window.location.href}
                            >
                                <div className = "share-tooltip-item-img-wrap">
                                    <img alt = "" src = {EmailIcon}/>
                                </div>
                            </EmailShareButton>
                            <p>Email</p>
                        </div>
                        <div onClick = {() => {
                            //@ts-ignore
                            window.globals.dom.copyTextToClipboard(window.location.href);
                            enqueueSnackbar(`Copied to clipboard`, { variant: 'success' });
                        }} className = "share-tooltip-item">
                            <div className = "share-tooltip-item-img-wrap">
                                <img alt = "" src = {LinkIcon}/>
                            </div>
                            <p>Link</p>
                        </div>
                    </div>
                }
                onClose={handleClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
            >
                <div onClick = {handleClose} className = "share-wrap">
                    <img alt ="" src = {open? ShareActiveIcon : ShareDisableIcon}/>
                </div>
            </Tooltip>
        </div>
    )
}

export default Share;