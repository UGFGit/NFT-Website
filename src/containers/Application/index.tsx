import React, { useState } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../../static/styles/application.scss';
import Input from  '../../components/Input';
import { APPLICATION_CREATE, FILESTORE_UPLOAD } from '../../constants/endpoints';
import { fetch } from '../../libs';
import { useHistory } from 'react-router-dom';
import Dropzone, { IFile } from '../../components/Dropzone';
import { serialize } from 'object-to-formdata';

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
    
    const [nickname, setNickname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<IFile>();
    const [cryptoPrice, setCryptoPrice] = useState('');
    const [errors, setErrors] = useState<Errors>({});

    const handleSubmit = async () => {
        const data = { 
            nickname, 
            name, 
            email, 
            address, 
            price: price && Number(price), 
            cryptoPrice: cryptoPrice && Number(cryptoPrice), 
            description, 
            ...file 
        };
        const response = await fetch.post(APPLICATION_CREATE, data);
        if(response.ok){
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
   
    return(
        <DocumentTitle title="Application">
            <div className = 'application-root'>
                <Navigation location={LocationEnum.APPLICATION}/>
                <div className = 'application-body'>
                    <p className='title'>Application</p>
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
                    <div className = 'dropzone-wrap'>
                        <Dropzone
                            file = {file}
                            onChange = {sendFile}
                            error = {errors.filename && errors.mimetype}
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
            </div>
        </DocumentTitle>
    )
}

export default Application;