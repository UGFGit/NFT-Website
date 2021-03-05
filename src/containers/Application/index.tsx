import React, { useState } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../../static/styles/application.scss';
import Input from  '../../components/Input';
import { APPLICATION_CREATE, FILESTORE, FILESTORE_UPLOAD } from '../../constants/endpoints';
import { fetch } from '../../libs';
import { useHistory } from 'react-router-dom';
import Dropzone, { IFile } from '../../components/Dropzone';
import { serialize } from 'object-to-formdata';
import CropDialog from './CropDialog';
import { useSnackbar } from 'notistack';

interface Errors{
    nickname?: string;
    email?: string;
    address?: string;
    price?: string;
    cryptoPrice?: string;
    name?: string;
    description?: string;
    filename?: string;
    mimetype?: string;
}

function Application(){
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
    const [bannerDialogOpen, setBannerDialogOpen] = useState(false);
    
    const [nickname, setNickname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<IFile>();
    const [cryptoPrice, setCryptoPrice] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const [avatar, setAvatar] = useState("");
    const [background, setBackground] = useState("");

    const handleSubmit = async () => {
        const data = { 
            nickname, 
            name, 
            email, 
            address, 
            price: price && Number(price), 
            cryptoPrice: cryptoPrice && Number(cryptoPrice), 
            description, 
            avatar,
            background,
            ...file 
        };
        const response = await fetch.post(APPLICATION_CREATE, data);

        if(response.ok){
            enqueueSnackbar('Your application is accepted', { variant: 'success' });
            return history.push('/');
        }

        const { code, desc } = await response.json();

        if(code && code === 3){
            const errs = {} as any;

            for(let i=0; i < desc.length; i++){
                const err = desc[i];
                errs[err.property] = Object.values(err.constraints)[0];
            }

            setErrors(errs);
        }

        enqueueSnackbar('Fill in all the fields of the application', { variant: 'error' });
    }

    const sendFile = async (file: any) => {
        const options = { indices: true };        
        const formData = serialize({ file }, options);
        const response = await fetch.post(FILESTORE_UPLOAD, formData);
        const body = await response.json();
        if(response.ok){
            return setFile({ filename: body.filename, mimetype: body. mimetype});
        }
    }

    const sendAvatar = async (file: any) => {
        const options = { indices: true };        
        const formData = serialize({ file }, options);
        const response = await fetch.post(FILESTORE_UPLOAD, formData);
        const body = await response.json();
        if(response.ok){
            setAvatar(body.filename);
        }
        
        setAvatarDialogOpen(false);
    }

    const sendBackground = async (file: any) => {
        const options = { indices: true };        
        const formData = serialize({ file }, options);
        const response = await fetch.post(FILESTORE_UPLOAD, formData);
        const body = await response.json();
        if(response.ok){
            setBackground(body.filename);
        }
        
        setBannerDialogOpen(false);
    }
   
    return(
        <DocumentTitle title="Application">
            <div className = 'application-root'>
                <Navigation location={LocationEnum.APPLICATION}/>
                <div className = 'application-body'>
                    <p className='title'>Application</p>
                    <p className='application-body-block-title'>Profile information</p>
                    <div 
                        className = "application-body-background-wrap"
                        onClick = {(event: any) => {
                            if(!['application-body-avatar-wrap', "application-body-avatar"].includes(event.target.className)){
                                setBannerDialogOpen(true);
                            }
                        }}
                    >
                        {!background && <p className = "application-body-background-title">Your banner photo</p>}
                        {background && <img className = "application-body-background" alt ="" src = {FILESTORE(background)}/>}
                        <div 
                            className = "application-body-avatar-wrap"
                            onClick = {() => setAvatarDialogOpen(true)}
                        >
                            {avatar && <img className = "application-body-avatar" alt = "" src = {FILESTORE(avatar)}/>}
                        </div>
                    </div>
                    <Input
                        lable = "Name"
                        value = {nickname}
                        onChange= {(value) => {
                            setNickname(value);
                            setErrors({...errors, nickname: undefined});
                        }}
                        placeholder = "Your name"
                        error = {errors.nickname}
                    />
                    <div className = "divader"/>
                    <p className='application-body-block-title'>Contact information</p>
                    <Input
                        lable = "Email"
                        value = {email}
                        onChange= {(value) => {
                            setEmail(value)
                            setErrors({...errors, email: undefined});
                        }}
                        placeholder = "Email"
                        error = {errors.email}
                    />
                    <Input
                        lable = "Wallet address"
                        value = {address}
                        onChange= {(value) => {
                            setAddress(value);
                            setErrors({...errors, address: undefined});
                        }}
                        placeholder = "Wallet address"
                        error = {errors.address}
                    />
                    <div className = "divader"/>
                    <div className = 'dropzone-wrap'>
                        <Dropzone
                            file = {file}
                            onChange = {sendFile}
                            error = {errors.filename && errors.mimetype}
                        />
                    </div>
                    <div className = 'prices-wrap'>
                        <Input
                            lable = "Price (UOP)"
                            value = {cryptoPrice}
                            onChange= {(value) => {
                                setCryptoPrice(value);
                                setErrors({...errors, cryptoPrice: undefined});
                            }}
                            placeholder = "Amount"
                            type = 'number'
                            error = {errors.cryptoPrice}
                        />
                        <Input
                            lable = "Price (€)"
                            value = {price}
                            onChange= {(value) => {
                                setPrice(value);
                                setErrors({...errors, price: undefined});
                            }}
                            placeholder = "Amount"
                            type = 'number'
                            error = {errors.price}
                        />
                    </div>
                    <Input
                        lable = "Name"
                        value = {name}
                        onChange= {(value) => {
                            setName(value);
                            setErrors({...errors, name: undefined});
                        }}
                        placeholder = "Name of your artwork"
                        error = {errors.name}
                    />
                    <Input
                        lable = "Description"
                        optional = {true}
                        value = {description}
                        maxLength = {100}
                        onChange= {(value) => {
                            setDescription(value);
                            setErrors({...errors, description: undefined});
                        }}
                        placeholder = "Description of your artwork"
                        helperText = 'max 100 words'
                        error = {errors.description}
                    />

                    <button onClick={handleSubmit} className="submit-btn">Submit</button>
                </div>
                <Footer/>
                <CropDialog
                    open = {avatarDialogOpen}
                    onClose = {() => setAvatarDialogOpen(false)}
                    onSave = {(file) => sendAvatar(file)}
                    type = "avatar"
                />
                <CropDialog
                    open = {bannerDialogOpen}
                    onClose = {() => setBannerDialogOpen(false)}
                    onSave = {(file) => sendBackground(file)}
                    type = "banner"
                />
            </div>
        </DocumentTitle>
    )
}

export default Application;