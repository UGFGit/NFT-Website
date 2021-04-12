import React, {useCallback, useState} from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import '../../static/styles/crop-dialog.scss';
import {useDropzone} from 'react-dropzone';
import Cropper  from 'react-easy-crop';
import getCroppedImg from '../../libs/cropImage';
import { useSnackbar } from 'notistack';
import classNames from 'classnames';

interface ICropDialogProps{
    type: 'avatar' | 'banner'
    onClose: () => void;
    onSave: (file: any) => void;
    open: boolean;
}

function CropDialog({ open, onClose, type, onSave }: ICropDialogProps){
    const { enqueueSnackbar } = useSnackbar();

    const [file, setFile] = useState<any>();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onDrop = useCallback(([file]) => {
        file.preview = window.URL.createObjectURL(file);
        setFile(file)
    }, [])
    
    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/*', multiple: false, maxSize: 31457280});

    return(
        <MuiDialog maxWidth = 'md' className = "crop-dialog-root" open={open} onClose = {onClose}>
            <DialogTitle>
                <div className = "crop-dialog-card-header">
                    <p className = "crop-dialog-card-header-title">{type === 'avatar'? 'Profile photo': "Banner photo"}</p>
                    <IconButton style = {{marginLeft: 'auto'}} onClick = {onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className = 'crop-dialog-content'>
                    {!file && 
                        <div style = {{outline: 0}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            {type === 'avatar' && <div className = 'crop-dialog-avatar-stub'/>}
                            {type === 'banner' && 
                                <div className = 'crop-dialog-banner-stub'>
                                    <p>Your banner photo</p>
                                </div>
                            }
                        </div>
                    }
                    { file && 
                        <div className = {classNames("crop-dialog-crop-container", {
                            'crop-dialog-crop-container-avatar': type === 'avatar',
                            'crop-dialog-crop-container-banner': type === 'banner'
                        })}>
                            <Cropper
                                image = {file.preview}
                                cropShape={type === 'avatar'? 'round': 'rect'}
                                crop={crop}
                                zoom={zoom}
                                cropSize = {type === 'avatar'? {width: 200, height: 200}: {width: 500, height: 300}}
                                onCropChange={setCrop}
                                onCropComplete={(croppedArea, croppedAreaPixels) => {
                                    setCroppedAreaPixels(croppedAreaPixels)
                                }}
                                onZoomChange={setZoom}
                            />
                        </div>
                    }
                    <p className = "crop-dialog-image-info">{`Your ${type === 'avatar'? 'user': 'banner'} photo (${type === 'avatar'? '200*200' : '500*300'}) png, gpeg`}</p>
                </div>                    
            </DialogContent>
            <DialogActions className = 'crop-dialog-actions'>
                {file && 
                    <div onClick = {() => setFile(null)} className = "crop-dialog-delete-btn"/>
                }
                <button 
                    onClick = {async () => {
                        if(!file){
                            return  enqueueSnackbar('Image for cropping does not selected', { variant: 'warning' })
                        }
                        try {
                            enqueueSnackbar('Cropening image start', { variant: 'info' })
                            const croppedImage = await getCroppedImg(file.preview,croppedAreaPixels);
                            onSave(croppedImage);
                        } catch (error) {
                            enqueueSnackbar('Crop image fail', { variant: 'error' });
                            console.error(error)
                        }
                    }} 
                    className = "crop-dialog-save-btn"
                >Save</button>
            </DialogActions>
        </MuiDialog>
    )
}

export default CropDialog;