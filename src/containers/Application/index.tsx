import React, { useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
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
import classNames from 'classnames';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { CurrencyEnum } from '../../constants/blockchain/currency';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface NtfsErrors{
    cryptoPrice?: string;
    number?: string;
    filename?: string;
    filePlaceholder?: string;
    mimetype?: string;
    name?: string;
    description?: string;
    currency?: string;
    auctionEnd?: string;
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
    number: string;
    currency: CurrencyEnum;
    auction: string;
    auctionEnd: Date;
}

const DEFAULT_NFT: Nft = {
    price: "",
    cryptoPrice : "",
    description : "",
    number: "1",
    name: "",
    currency: CurrencyEnum.WETH,
    auction: "false",
    auctionEnd: new Date()
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
                cryptoPrice: nft.cryptoPrice? Number(nft.cryptoPrice): '',
                name: nft.name,
                description: nft.description,
                number: nft.number? Number(nft.number): '',
                currency: nft.currency,
                auction: nft.auction,
                auctionEnd: nft.auctionEnd
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
                <div className = 'application-body'>
                    <p className='application-body-block-title'>Profile information</p>
                    <div 
                        className = {classNames("application-body-background-wrap", { error: Boolean(errors.background)})}
                        onClick = {(event: any) => {
                            if(!['application-body-avatar-wrap', "application-body-avatar", 'application-body-avatar-wrap error'].includes(event.target.className)){
                                setBannerDialogOpen(true);
                                setErrors({...errors, background: undefined});
                            }
                        }}
                    >
                        {!background && <p className = "application-body-background-title">Your banner photo</p>}
                        {background && <img className = "application-body-background" alt ="" src = {FILESTORE(background)}/>}
                        <div 
                            className = {classNames("application-body-avatar-wrap", { error: Boolean(errors.avatar)})}
                            onClick = {() => {
                                setAvatarDialogOpen(true);
                                setErrors({...errors, avatar: undefined});
                            }}
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
                            setEmail(value);
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

                                            if(errors.nfts && errors.nfts[index]){
                                                const e = [...errors.nfts];
                                                e[index] = {...e[index], filename: undefined, mimetype: undefined};
                                                setErrors({...errors, nfts: e});
                                            }
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

                                            if(errors.nfts && errors.nfts[index]){
                                                const e = [...errors.nfts];
                                                e[index] = {...e[index], filePlaceholder: undefined};
                                                setErrors({...errors, nfts: e});
                                            }
                                        }}
                                        error={errors.nfts && errors.nfts[index] && errors.nfts[index].filePlaceholder}
                                    />
                                </div>}
                                <div className = 'prices-wrap'>
                                    <Select
                                        className = "prices-cyrrency-select"
                                        value={nft.currency}
                                        onChange={(event) => {
                                            //@ts-ignore
                                            nft.currency = event.target.value;

                                            if(nft.price){
                                                const crypto = event.target.value === CurrencyEnum.UOP? prices.USD.UOP : prices.USD.WETH;

                                                nft.cryptoPrice = `${Number(nft.price) * crypto}`;
                                            }

                                            nfts[index] = nft;
                                            setNfts([...nfts]);
                                        }}
                                        disableUnderline = {true}    
                                        MenuProps={{
                                            getContentAnchorEl: null,
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }
                                        }}                            
                                    >
                                        <MenuItem value={CurrencyEnum.WETH}>WETH</MenuItem>
                                        <MenuItem value={CurrencyEnum.UOP}>UOP</MenuItem>
                                    </Select>
                                    <div className = "prices-input-wrap">
                                        <Input
                                            lable = "Price"
                                            value = {nft.cryptoPrice}
                                            onChange= {(value) => {
                                                nft.cryptoPrice = value;
                                                nfts[index] = nft;
                                                setNfts([...nfts]);

                                                if(errors.nfts && errors.nfts[index]){
                                                    const e = [...errors.nfts];
                                                    e[index] = {...e[index], cryptoPrice: undefined};
                                                    setErrors({...errors, nfts: e});
                                                }
                                            }}
                                            onBlur = {() => {
                                                const crypto = nft.currency === CurrencyEnum.UOP? prices.UOP.USD : prices.WETH.USD;

                                                nft.price = `${Number(nft.cryptoPrice) * crypto}`;
                                                nfts[index] = nft;
                                                setNfts([...nfts]);
                                            }}
                                            placeholder = "Amount"
                                            type = 'number'
                                            error={errors.nfts && errors.nfts[index] && errors.nfts[index].cryptoPrice}
                                        />
                                    </div>
                                    <Input
                                        lable = "Price ($)"
                                        value = {nft.price}
                                        onChange= {(value) => {
                                            nft.price = value;
                                            nfts[index] = nft;
                                            setNfts([...nfts]);
                                        }}
                                        onBlur = {() => {
                                            const crypto = nft.currency === CurrencyEnum.UOP? prices.USD.UOP : prices.USD.WETH;

                                            nft.cryptoPrice = `${Number(nft.price) * crypto}`;
                                            nfts[index] = nft;
                                            setNfts([...nfts]);

                                            if(errors.nfts && errors.nfts[index]){
                                                const e = [...errors.nfts];
                                                e[index] = {...e[index], cryptoPrice: undefined};
                                                setErrors({...errors, nfts: e});
                                            }
                                        }}
                                        placeholder = "Amount"
                                        type = 'number'
                                    />
                                </div>
                                <Input
                                    lable = "Name"
                                    value = {nft.name}
                                    onChange= {(value) => {
                                        nft.name = value;
                                        nfts[index] = nft;
                                        setNfts([...nfts]);

                                        if(errors.nfts && errors.nfts[index]){
                                            const e = [...errors.nfts];
                                            e[index] = {...e[index], name: undefined};
                                            setErrors({...errors, nfts: e});
                                        }
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
                                        setNfts([...nfts]);

                                        if(errors.nfts && errors.nfts[index]){
                                            const e = [...errors.nfts];
                                            e[index] = {...e[index], description: undefined};
                                            setErrors({...errors, nfts: e});
                                        }
                                    }}
                                    placeholder = "Description of your artwork"
                                    helperText = 'max 100 words'
                                    error={errors.nfts && errors.nfts[index] && errors.nfts[index].description}
                                />
                                <Input
                                    lable = "Number of copies"
                                    value = {nft.number}
                                    min = {1}
                                    disabled = {nft.auction === 'true'}
                                    onChange= {(value) => {
                                        nft.number = value;
                                        nfts[index] = nft;
                                        setNfts([...nfts]);

                                        if(errors.nfts && errors.nfts[index]){
                                            const e = [...errors.nfts];
                                            e[index] = {...e[index], number: undefined};
                                            setErrors({...errors, nfts: e});
                                        }
                                    }}
                                    placeholder = "Number"
                                    type = 'number'
                                    error={errors.nfts && errors.nfts[index] && errors.nfts[index].number}
                                />
                                <div className = 'prices-auction-wrap'>
                                    <p className = "prices-auction-title">On auction</p>
                                    <Select
                                        className = "prices-auction-select"
                                        value={nft.auction}
                                        onChange={(event) => {
                                            //@ts-ignore
                                            nft.auction = event.target.value;
                                            if(event.target.value === 'true'){
                                                nft.number = '1';
                                            }
                                           
                                            nfts[index] = nft;
                                            setNfts([...nfts]);
                                        }}
                                        disableUnderline = {true}    
                                        MenuProps={{
                                            getContentAnchorEl: null,
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }
                                        }}                            
                                        >
                                            <MenuItem value='true'>Yes</MenuItem>
                                            <MenuItem value='false'>No</MenuItem>
                                    </Select>
                                </div>
                                {nft.auction === 'true' && <div className = "prices-date-picker-wrap">
                                    <p className = "prices-date-picker-title">Auction end</p>
                                    <DatePicker
                                        selected = {nft.auctionEnd}
                                        minDate = {new Date()}
                                        onChange = {(date) => {
                                            //@ts-ignore
                                            nft.auctionEnd = date;
                                            nfts[index] = nft;
                                            setNfts([...nfts]);
                                        }}
                                        closeOnScroll
                                    />
                                </div>}
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