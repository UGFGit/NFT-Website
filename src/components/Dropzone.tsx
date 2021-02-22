import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import { FILESTORE } from '../constants/endpoints';
import '../static/styles/dropzone.scss';
import classNames from 'classnames';

export interface IFile {
    filename: string;
    mimetype: string;
}

interface DropzoneProps{
    file?: IFile;
    onChange: (file: any) => void;
    error?: string;
}

function Dropzone({ file, onChange, error }: DropzoneProps){
    const onDrop = useCallback(([file]) => {
        file.preview = window.URL.createObjectURL(file);
        onChange(file)
    }, [])
    
    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/*', multiple: false, maxSize: 31457280});

    return(
        <div className = 'dropzone-root'>
            <p className = 'dropzone-title'>Upload file</p>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!file && 
                    <div className = {classNames('dropzone-body-wrap', { 'error': Boolean(error)})}>
                        <p className = {classNames('dropzone-body-title', { 'error': Boolean(error)})}>PNG, GIF or WEBP. Max 30mb.</p>
                        <div className = 'dropzone-btn'>
                            <p className = 'dropzone-btn-title'>Choose file</p>
                        </div>
                    </div>
                }

                {file && 
                    <div className = 'dropzone-image-wrap'>
                        <img className = "dropzone-image" alt = "" src = {FILESTORE(file.filename)}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dropzone;