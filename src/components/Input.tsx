import React from 'react'
import '../static/styles/input.scss';
import classNames from 'classnames';

interface InputProps{
    lable: string;
    value: number | string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    placeholder: string;
    type?: 'text' | 'number',
    optional?: boolean;
    helperText?: string;
    maxLength?: number;
    error?: string;
    min?: number;
    disabled?: boolean;
}

function Input({ lable, value, onChange, placeholder, type, optional, helperText, maxLength, error, onBlur, min = 0, disabled= false }: InputProps){
    return(
        <div className='input-root'>
            <div className = "input-lable-wrap">
                <p className = 'input-lable'>{lable}</p>
                {optional && <p className = 'input-optional-lable'>(Optional)</p>}
            </div>
            <input 
                value = {value} 
                onChange={(event) => onChange && onChange(event.target.value)} 
                onBlur = {onBlur}
                className = "input"
                placeholder = {placeholder}
                type={type || 'text'}
                maxLength = {maxLength}
                min = {min}
                disabled = {disabled}
            />
            <div className = "input-help-wrap">
                { error && <p className = "error-text">{error}</p>}
                {helperText && <p className='helper-text'>{helperText}</p>}
            </div>
        </div>
    )
}

export default Input;