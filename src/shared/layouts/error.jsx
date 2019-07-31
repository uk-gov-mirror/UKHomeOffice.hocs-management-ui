import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Error extends Component {

    componentDidMount() {
        const { error } = this.props;

        // A 401 with empty response will be a keycloak auth error, redirect to home/login
        if (error && error.status === 401 && !error.message) {
            /* eslint-disable no-undef*/
            if (window) {
                window.location.replace('/');
            }
            /* eslint-enable no-undef*/
        }
    }

    getDefaultContent(status) {
        switch (status) {
        case 401:
            return {
                defaultTitle: 'Unauthorised'
            };
        case 403:
            return {
                defaultTitle: 'You do not have permission',
                defaultBody: [
                    'If you expect permission to perform this action, raise a ticket.'
                ]
            };
        case 404:
            return {
                defaultTitle: 'Page does not exist',
                defaultBody: [
                    'If you typed the web address, check it is correct.',
                    'If you pasted the web address, check you copied the entire address.'
                ]
            };
        default:
            return {
                defaultTitle: 'Something has gone wrong',
                defaultBody: [
                    'Please try again'
                ]
            };
        }
    }

    UNSAFE_componentWillMount() {
        const { error, staticContext } = this.props;
        if (staticContext) {
            staticContext.status = error.status;
        }
    }

    buildParagraphs(body) {
        if (!body) return null;
        return body.map((paragraph, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <p key={index} className="govuk-body">{paragraph}</p>;
        });
    }

    render() {
        const { error } = this.props;
        const {
            title,
            location,
            stack,
            status,
            body,
            message,
        } = error;

        const { defaultTitle, defaultBody } = this.getDefaultContent(status);

        return (
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-full'>
              <h1 className='govuk-heading-xl'>
                {title ? title : defaultTitle}
                {message && <span className='govuk-caption-xl'>{message}</span>}
              </h1>
              {body ? this.buildParagraphs(body) : this.buildParagraphs(defaultBody)}
              {status === 404 && location && location.pathname && <p><code className='code'>{location.pathname}</code></p>}
              {stack && (
                <details className='govuk-details' open>
                  <summary className='govuk-details__summary'>
                    <span className='govuk-details__summary-text'>
                        Stack trace
                    </span>
                  </summary>
                  <div className='govuk-details__text'>
                    <pre className='code overflow-scroll'>{stack}</pre>
                  </div>
                </details>
               )}
            </div>
          </div>
        );
    }     
}

Error.propTypes = {
    // eslint-disable-next-line react/require-default-props
    error: PropTypes.object.isRequired,
    // eslint-disable-next-line react/require-default-props
    staticContext: PropTypes.object,
};

Error.defaultProps = {
    // eslint-disable-next-line react/default-props-match-prop-types
    error: {}
};

export default Error;