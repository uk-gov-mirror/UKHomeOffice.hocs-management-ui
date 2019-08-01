import React from 'react';
import PropTypes from 'prop-types';

const PhaseBannerComponent = ({ feedback, phase }) => (
  <div className="govuk-phase-banner">
    <p className="govuk-phase-banner__content">
      <strong className="govuk-tag govuk-phase-banner__content__tag">{phase}</strong>
      <span>
        This is a new service – your
        <a
          href={feedback}
        >
          feedback
        </a>
        {' '}
          will help us to improve it.
      </span>
    </p>
  </div>
)


PhaseBannerComponent.propTypes = {
    feedback: PropTypes.string,
    phase: PropTypes.string
};

PhaseBannerComponent.defaultProps = {
    feedback: '/',
    phase: 'PROTOTYPE'
};

export default PhaseBannerComponent