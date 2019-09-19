import React from 'react';

export interface PhaseBannerComponentProps {
    feedback?: string;
    phase?: string;
}

const PhaseBannerComponent: React.FC<PhaseBannerComponentProps> = ({ feedback = '/', phase = 'PROTOTYPE' }) => (
    <div className="govuk-phase-banner">
        <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag">{phase}</strong>
            <span>
                This is a new service – your&nbsp;
                <a href={feedback}>
                    feedback
                </a>
                {' '}
                will help us to improve it.
            </span>
        </p>
    </div>
);

export default PhaseBannerComponent;
