import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import { FILESTORE } from '../constants/endpoints';
import '../static/styles/dropzone.scss';

interface DropzoneProps{
    file: any;
    onChange: (file: any) => void;
}

function Dropzone({ file, onChange }: DropzoneProps){
    const onDrop = useCallback(([file]) => {
        file.preview = window.URL.createObjectURL(file);
        onChange(file)
    }, [])
    
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return(
        <div className = 'dropzone-root'>
            <p className = 'dropzone-title'>Upload file</p>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!file && 
                    <div className = 'dropzone-body-wrap'>
                        <p className = 'dropzone-body-title'>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</p>
                        <div className = 'dropzone-btn'>
                            <p className = 'dropzone-btn-title'>Choose file</p>
                        </div>
                    </div>
                }

                {file && 
                    <div className = 'dropzone-image-wrap'>
                        <img className = "dropzone-image" alt = "" src = {FILESTORE(file)}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dropzone;