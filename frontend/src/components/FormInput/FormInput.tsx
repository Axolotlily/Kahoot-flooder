import React from 'react';
import './FormInput.css';

type Props = {
    children: React.ReactNode,
    placeholder: string,
    value: string,
    inputType: string,
    min?: string,
    max?: string,
    onChange: (event: string) => void,
}

export function FormInput ({ children, placeholder, value, onChange, inputType, min, max }: Props) {
    return (
        <div className='form-input-container'>
            <h1 className='form-input-title'>{children}</h1>
            <input 
                value={value} 
                placeholder={placeholder} 
                onChange={(e) => onChange(e.target.value)} 
                type={inputType}
                max={max}
                min={min}
                className='form-input-input' 
            />
        </div>
    )
}