import React, { useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation, { LocationEnum } from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../../static/styles/application.scss';
import Input from  '../../components/Input';
import { APPLICATION_CREATE, FILESTORE, FILESTORE_UPLOAD, CRYPTO_COMPARE } from '../../constants/endpoints';
import { fetch } from '../../libs';
import { useHistory } from 'react-router-dom';
import Dropzone, { IFile } from '../../components/Dropzone';
import { serialize } from 'object-to-formdata';
import CropDialog from './CropDialog';
import { useSnackbar } from 'notistack';
import MultipleGroup from '../../components/MultipleGroup';

interface NtfsErrors{
    price?: string;
    cryptoPrice?: string;
    number?: string;
    filename?: string;
    filePlaceholder?: string;
    mimetype?: string;
    name?: string;
    description?: string;
}
interface Errors{
    nickname?: string;
    email?: string;
    address?: string;
    avatar?: string;
    background?: string;
    nfts?: NtfsErrors[];
}

interface IPrices{
    [key: string]: {
        [key: string]: number
    }
}

interface Nft{
    file?: IFile,
    filePlaceholder?: IFile;
    price: string,
    cryptoPrice: string,
    name: string;
    description: string;
    number: string
}

const DEFAULT_NFT: Nft = {
    price: "",
    cryptoPrice : "",
    description : "",
    number: "1",
    name: ""
}

function Application(){
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
    const [bannerDialogOpen, setBannerDialogOpen] = useState(false);
    
    const [avatar, setAvatar] = useState("");
    const [background, setBackground] = useState("");
    const [nickname, setNickname] = useState("");

    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [nfts, setNfts] = useState<Nft[]>([Object.assign({}, DEFAULT_NFT)]);

    const [prices, setPices] = useState<IPrices>({});

    const [errors, setErrors] = useState<Errors>({});

    const buildErr = (err: { children: any[], property: string, constraints: {[key: string]: string}}) => {
        const errs = {} as any;
        errs[err.property] = Object.values(err.constraints)[0];
        return errs;
    }

    const handleSubmit = async () => {
        const data = { 
            avatar,
            background,
            nickname, 
            email, 
            address, 
            nfts: nfts.map((nft) => ({
                ...nft.file,
                filePlaceholder: nft.filePlaceholder && nft.filePlaceholder.filename,
                price: nft.price? Number(nft.price) : '',
                cryptoPrice: nft.cryptoPrice? Number(nft.cryptoPrice): '',
                name: nft.name,
                description: nft.description,
                number: nft.number? Number(nft.number): ''
            }))
        };
        const response = await fetch.post(APPLICATION_CREATE, data);

        if(response.ok){
            enqueueSnackbar('Your application is accepted', { variant: 'success' });
            window.scrollTo(0, 0);
            return history.push('/');
        }

        const res = await response.json();

        if(res.code && res.code === 3){
            let errs = {} as any;

            for(let i=0; i < res.desc.length; i++){
                const err = res.desc[i];
                if(err.constraints){
                    errs = Object.assign({}, errs, buildErr(err));
                }     
                
                if(err.children && err.children.length > 0){
                    let childrenErr: any[] = [];

                    for(let i=0;i< err.children.length; i++){
                        let ee = {};
                        err.children[i].children.forEach((er: any) => {
                            ee = Object.assign({}, ee, buildErr(er));
                        });
                        childrenErr[Number(err.children[i].property)] = ee;
                    }

                    errs[err.property] = childrenErr;
                }
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
            return { filename: body.filename, mimetype: body.mimetype};
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

    const loadPrices = async () => {
        const response = await fetch.get(CRYPTO_COMPARE);
        if(response.ok){
            const body = await response.json();
            setPices(body);
        }
    }

    useEffect(() => {
        loadPrices();
    }, []);
   
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
                            setEmail(value);
                        }}
                        placeholder = "Email"
                        error = {errors.email}
                    />
                    <Input
                        lable = "Wallet address"
                        value = {address}
                        onChange= {(value) => {
                            setAddress(value);
                        }}
                        placeholder = "Wallet address"
                        error = {errors.address}
                    />
                    <MultipleGroup
                        values = {nfts}
                        defaultValue = {Object.assign({}, DEFAULT_NFT)}
                        handleAdd = {(list) => setNfts(list)}
                        handleRemove = {(list) => setNfts(list)}
                        renderItem = {(nft: Nft, index) => (
                            <div key = {index}>
                                <p className = "collection-title">Collection {index + 1}</p>
                                <div className = 'dropzone-wrap'>
                                    <Dropzone
                                        file = {nft.file}
                                        accept = {['audio/*', 'video/*', 'image/*']}
                                        type = "file"
                                        onChange = {async (file) => {
                                            const data = await sendFile(file);
                                            nft.file = data;
                                            nfts[index] = nft;
                                            setNfts([...nfts]);
                                        }}
                                        error={errors.nfts && errors.nfts[index] && errors.nfts[index].filename && errors.nfts[index].mimetype}
                                    />
                                </div>

                                {nft.file && nft.file.mimetype.split('/')[0] !== 'image' && <div className = 'dropzone-wrap'>
                                    <p className = "dropzone-wrap-title">Icon</p>
                                    <Dropzone
                                        file = {nft.filePlaceholder}
                                        accept = 'image/*'
                                        type = 'icon'
                                        onChange = {async (file) => {
                                            const data = await sendFile(file);
                                            nft.filePlaceholder = data;
                                            nfts[index] = nft;
                                            setNfts([...nfts]);
                                        }}
                                        error={errors.nfts && errors.nfts[index] && errors.nfts[index].filePlaceholder}
                                    />
                                </div>}
                                <div className = 'prices-wrap'>
                                    <Input
                                        lable = "Price (WETH)"
                                        value = {nft.cryptoPrice}
                                        onChange= {(value) => {
                                            nft.cryptoPrice = value;
                                            nfts[index] = nft;
                                            setNfts([...nfts])
                                        }}
                                        onBlur = {() => {
                                            nft.price = `${Number(nft.cryptoPrice) * prices.WETH.USD}`;
                                            nfts[index] = nft;
                                            setNfts([...nfts])
                                        }}
                                        placeholder = "Amount"
                                        type = 'number'
                                        error={errors.nfts && errors.nfts[index] && errors.nfts[index].cryptoPrice}
                                    />
                                    <Input
                                        lable = "Price ($)"
                                        value = {nft.price}
                                        onChange= {(value) => {
                                            nft.price = value;
                                            nfts[index] = nft;
                                            setNfts([...nfts])
                                        }}
                                        onBlur = {() => {
                                            nft.cryptoPrice = `${Number(nft.price) * prices.USD.WETH}`;
                                            nfts[index] = nft;
                                            setNfts([...nfts])
                                        }}
                                        placeholder = "Amount"
                                        type = 'number'
                                        error={errors.nfts && errors.nfts[index] && errors.nfts[index].price}
                                    />
                                </div>
                                <Input
                                    lable = "Name"
                                    value = {nft.name}
                                    onChange= {(value) => {
                                        nft.name = value;
                                        nfts[index] = nft;
                                        setNfts([...nfts])
                                    }}
                                    placeholder = "Name of your artwork"
                                    error={errors.nfts && errors.nfts[index] && errors.nfts[index].name}
                                />
                                <Input
                                    lable = "Description"
                                    optional = {true}
                                    value = {nft.description}
                                    maxLength = {100}
                                    onChange= {(value) => {
                                        nft.description = value;
                                        nfts[index] = nft;
                                        setNfts([...nfts])
                                    }}
                                    placeholder = "Description of your artwork"
                                    helperText = 'max 100 words'
                                    error={errors.nfts && errors.nfts[index] && errors.nfts[index].description}
                                />
                                <Input
                                    lable = "Number of copies"
                                    value = {nft.number}
                                    min = {1}
                                    onChange= {(value) => {
                                        nft.number = value;
                                        nfts[index] = nft;
                                        setNfts([...nfts])
                                    }}
                                    placeholder = "Number"
                                    type = 'number'
                                    error={errors.nfts && errors.nfts[index] && errors.nfts[index].number}
                                />
                            </div>
                        )}
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