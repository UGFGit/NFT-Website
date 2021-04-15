import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone'
import { FILESTORE, FILESTORE_UPLOAD } from '../constants/endpoints';
import '../static/styles/dropzone.scss';
import classNames from 'classnames';
import AudioPlayer from '../components/AudioPlayer';
import VideoPlayer from './VideoPlayer';
import { serialize } from 'object-to-formdata';
import { fetch } from '../libs';
import { useSnackbar } from 'notistack';
import Lottie from './Lottie';

export interface IFile {
    filename: string;
    mimetype: string;
}

interface DropzoneProps{
    file?: IFile;
    onChange: (file: any) => void;
    error?: string;
    type: 'file' | 'icon';
    accept: string | string[]; //'image/*'
}

const FILE_TEXT = "PNG, GIF, WEBP, MP4 or MP3. Max 100mb.";
const ICON_TEXT = 'Choose an icon from the suggested ones or upload a new one. It should grab the attention of viewers and reflect the content of the file';

function Dropzone({ file, onChange, error, accept, type }: DropzoneProps){
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const sendFile = async (file: any) => {
        const options = { indices: true };        
        const formData = serialize({ file }, options);
        const response = await fetch.post(FILESTORE_UPLOAD, formData);
        const body = await response.json();
        enqueueSnackbar("File uploaded", { variant: 'success'});
        if(response.ok){
            return { filename: body.filename, mimetype: body.mimetype};
        }

        return null;
    }

    const onDrop = useCallback(async ([file]) => {
        setLoading(true);
        enqueueSnackbar("The file is being uploaded, this may take up to several minutes", { variant: 'info'});
        const data = await sendFile(file);
        setLoading(false);
        onChange(data);
    }, [onChange]);
    
    const {getRootProps, getInputProps} = useDropzone({onDrop, accept, multiple: false, maxSize: 104857600, disabled: loading});
    
    return(
        <div className = 'dropzone-root'>
            <div {...getRootProps({
                onClick: (event: any) => {
                    if(['audio-player-controllers-img-wrap', 'audio-player-controllers-bar-wrap', 'audio-player-controllers-download-bar', 'audio-player-controllers-download-wrap'].includes(event.target.className) || event.target.localName === 'img'){
                        event.stopPropagation()
                    }
                }
            })}>
                <input {...getInputProps()} />
                {!file && !loading && 
                    <div className = {classNames('dropzone-body-wrap', { 'error': Boolean(error)})}>
                        <div className = "dropzone-body-title-wrap">
                            {type === 'file' && <p className = {classNames('dropzone-body-title', { 'error': Boolean(error)})}>Upload file</p>}
                            <p className = {classNames('dropzone-body-title', { 'error': Boolean(error)})}>{type === 'file'? FILE_TEXT: ICON_TEXT}</p>
                        </div>
                        <div className = 'dropzone-btn'>
                            <p className = 'dropzone-btn-title'>Choose file</p>
                        </div>
                    </div>
                }

                {file &&!loading && file.mimetype.split('/')[0] === 'image' && 
                    <div className = 'dropzone-image-wrap'>
                        <img className = "dropzone-image" alt = "" src = {FILESTORE(file.filename)}/>
                    </div>
                }
                {file && !loading && file.mimetype.split('/')[0] === 'audio' && 
                    <AudioPlayer
                        src = {FILESTORE(file.filename)}
                    />
                }
                {file && !loading && file.mimetype.split('/')[0] === 'video' && 
                    <VideoPlayer
                        src = {FILESTORE(file.filename)}
                    />
                }
                {loading && 
                    <div className = 'dropzone-loader'>
                        <Lottie width = {80} height = {80}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dropzone;