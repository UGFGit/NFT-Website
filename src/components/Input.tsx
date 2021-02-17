import React from 'react'
import '../static/styles/input.scss';

interface InputProps{
    lable: string;
    value: number | string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: 'text' | 'number',
    optional?: boolean;
    helperText?: string;
    maxLength?: number;
}

function Input({ lable, value, onChange, placeholder, type, optional, helperText, maxLength }: InputProps){
    return(
        <div className='input-root'>
            <div className = "input-lable-wrap">
                <p className = 'input-lable'>{lable}</p>
                {optional && <p className = 'input-optional-lable'>(Optional)</p>}
            </div>
            <input 
                value = {value} 
                onChange={(event) => onChange(event.target.value)} 
                className = "input"
                placeholder = {placeholder}
                type={type || 'text'}
                maxLength = {maxLength}
                min = {0}
            />
            {helperText && <p className='helper-text'>{helperText}</p>}
        </div>
    )
}

export default Input;