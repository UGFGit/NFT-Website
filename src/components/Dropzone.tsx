import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import { FILESTORE } from '../constants/endpoints';
import '../static/styles/dropzone.scss';
import classNames from 'classnames';
import AudioPlayer from '../components/AudioPlayer';
import ReactPlayer from 'react-player';

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

const FILE_TEXT = "PNG, GIF, WEBP, MP4 or MP3. Max 30mb.";
const ICON_TEXT = 'Choose an icon from the suggested ones or upload a new one. It should grab the attention of viewers and reflect the content of the file';

function Dropzone({ file, onChange, error, accept, type }: DropzoneProps){
    const onDrop = useCallback(([file]) => {
        onChange(file)
    }, [onChange])
    
    const {getRootProps, getInputProps} = useDropzone({onDrop, accept, multiple: false, maxSize: 104857600});
    
    return(
        <div className = 'dropzone-root'>
            <div {...getRootProps({
                onClick: (event: any) => {
                    if(['rhap_volume-indicator', 'rhap_progress-indicator', 'rhap_progress-bar rhap_progress-bar-show-download', 'rhap_volume-bar-area'].includes(event.target.className) || event.target.localName === 'path' || event.target.localName === 'svg'){
                        event.stopPropagation()
                    }
                }
            })}>
                <input {...getInputProps()} />
                {!file && 
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

                {file && file.mimetype.split('/')[0] === 'image' && 
                    <div className = 'dropzone-image-wrap'>
                        <img className = "dropzone-image" alt = "" src = {FILESTORE(file.filename)}/>
                    </div>
                }
                {file && file.mimetype.split('/')[0] === 'audio' && 
                    <AudioPlayer
                        src = {FILESTORE(file.filename)}
                    />
                }
                {file && file.mimetype.split('/')[0] === 'video' && 
                    <ReactPlayer
                        url = {FILESTORE(file.filename)}
                        width = '100%'
                    />
                }
            </div>
        </div>
    )
}

export default Dropzone;