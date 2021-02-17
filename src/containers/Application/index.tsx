import React, { useState } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../../static/styles/application.scss';
import Input from  '../../components/Input';
import { APPLICATION, FILESTORE_UPLOAD } from '../../constants/endpoints';
import { fetch } from '../../libs';
import { useHistory } from 'react-router-dom';
import Dropzone from '../../components/Dropzone';
import { serialize } from 'object-to-formdata';

function Application(){
    const history = useHistory();
    
    const [nickname, setNickname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState("");
    const [filename, setFilename] = useState('');

    const handleSubmit = async () => {
        const response = await fetch.post(APPLICATION, { nickname, name, email, address, price: Number(price), description, filename });
        if(response.ok){
            return history.push('/');
        }
        const body = await response.json();
        console.log(body);
    }

    const sendFile = async (file: any) => {
        const options = { indices: true };        
        const formData = serialize({ file }, options);
        const response = await fetch.post(FILESTORE_UPLOAD, formData);
        const body = await response.json();
        if(response.ok){
            return setFilename(body.filename);
        }
        console.log(body);
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
                        onChange= {(value) => setNickname(value)}
                        placeholder = "Your name"
                    />
                    <Input
                        lable = "Email"
                        value = {email}
                        onChange= {(value) => setEmail(value)}
                        placeholder = "Email"
                    />
                    <Input
                        lable = "Wallet address"
                        value = {address}
                        onChange= {(value) => setAddress(value)}
                        placeholder = "Wallet address"
                    />
                    <div className = 'prices-wrap'>
                        <Input
                            lable = "Price"
                            value = {price}
                            onChange= {(value) => setPrice(value)}
                            placeholder = "Amount"
                            type = 'number'
                        />
                        <Input
                            lable = "Price"
                            value = {price}
                            onChange= {(value) => setPrice(value)}
                            placeholder = "Amount"
                            type = 'number'
                        />
                    </div>
                    <div className = 'dropzone-wrap'>
                        <Dropzone
                            file = {filename}
                            onChange = {sendFile}
                        />
                    </div>
                    <Input
                        lable = "Name"
                        value = {name}
                        onChange= {(value) => setName(value)}
                        placeholder = "Name of your artwork"
                    />
                    <Input
                        lable = "Description"
                        optional = {true}
                        value = {description}
                        maxLength = {100}
                        onChange= {(value) => setDescription(value)}
                        placeholder = "Description of your artwork"
                        helperText = 'max 100 words'
                    />

                    <button onClick={handleSubmit} className="submit-btn">Submit</button>
                </div>
                <Footer/>
            </div>
        </DocumentTitle>
    )
}

export default Application;