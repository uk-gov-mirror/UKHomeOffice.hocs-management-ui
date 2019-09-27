import React from 'react';
import classNames from 'classnames';

interface SubmitProps {
    className?: string;
    disabled?: boolean;
    label?: string;
}

const Submit: React.FC<SubmitProps> = ({ className, disabled = false, label = 'Submit' }) => {
    return (
        <input
            className={classNames('govuk-button', className)}
            disabled={disabled}
            type="submit"
            value={label}
        />
    );
};

export default Submit;
