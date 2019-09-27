import React, { useState } from 'react';
import classNames from 'classnames';

interface TextProps {
    disabled?: boolean;
    error?: string;
    hint?: string;
    label?: string;
    name: string;
    type?: string;
    updateState: (value: InputEventData) => void;
    value?: string;
}

export interface InputEventData {
    name: string;
    value: string;
}

const Text: React.FC<TextProps> = ({ disabled = false,
    error,
    hint,
    name,
    label = name,
    type = 'text',
    updateState,
    value: initialValue = ''
}) => {

    const [value, setValue] = useState(initialValue);

    return (
        <div className={classNames('govuk-form-group', { 'govuk-form-group--error': error })}>

            <label htmlFor={name} id={`${name}-label`} className="govuk-label govuk-label--s">{label}</label>
            {hint && <span className="govuk-hint">{hint}</span>}
            {error && <span id={`${name}-error`} className="govuk-error-message">{error}</span>}

            <input className={classNames('govuk-input', { 'govuk-input--error': error })}
                id={name}
                type={type}
                name={name}
                disabled={disabled}
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={({ target: { name, value } }) => updateState({ name, value })}
            />
        </div>
    );
};

export default Text;
