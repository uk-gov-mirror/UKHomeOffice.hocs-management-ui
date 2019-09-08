import React from 'react';

export interface FormError {
    key: string;
    value: string;
}

interface ErrorSummaryProps {
    description: string;
    errors?: FormError[];
    heading?: string;
}

const ErrorSummary: React.FC<ErrorSummaryProps> = ({ description, errors, heading = 'There\'s a problem'  }) => {
    return errors ?
    <div className="govuk-error-summary" role="alert" aria-labelledby="error-summary-heading-example-1" tabIndex={-1}>
        <h2 className="govuk-error-summary__title" id="error-summary-heading-example-1">
            {heading}
        </h2>
        <div className="govuk-error-summary__body">
            {description && <p>
                {description}
            </p>}

            <ul className="govuk-list govuk-error-summary__list">
                {errors.map(({ key, value }) => {
                    const link = `${key}-error`;
                    return (
                        <li key={key}>
                            <a href={`#${link}`} onClick={scrollInToView.bind(null, link)} >{value}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    </div> : null;
};

const scrollInToView = (link: string, e: React.FormEvent<HTMLLinkElement>) => {
    e.preventDefault();
    const element = document.getElementById(link);
    if (element) {
        element.scrollIntoView();
    }
};

export default ErrorSummary;
