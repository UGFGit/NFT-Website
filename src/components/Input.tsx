import React from 'react'
import '../static/styles/input.scss';
import classNames from 'classnames';

interface InputProps{
    lable: string;
    value: number | string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder: string;
    type?: 'text' | 'number',
    optional?: boolean;
    helperText?: string;
    maxLength?: number;
    error?: string;
    min?: number
}

function Input({ lable, value, onChange, placeholder, type, optional, helperText, maxLength, error, onBlur, min = 0 }: InputProps){
    return(
        <div className='input-root'>
            <div className = "input-lable-wrap">
                <p className = 'input-lable'>{lable}</p>
                {optional && <p className = 'input-optional-lable'>(Optional)</p>}
            </div>
            <input 
                value = {value} 
                onChange={(event) => onChange(event.target.value)} 
                onBlur = {onBlur}
                className = {classNames("input", { error: Boolean(error)})}
                placeholder = {placeholder}
                type={type || 'text'}
                maxLength = {maxLength}
                min = {min}
            />
            <div className = "input-help-wrap">
                { error && <p className = "error-text">{error}</p>}
                {helperText && <p className='helper-text'>{helperText}</p>}
            </div>
        </div>
    )
}

export default Input;