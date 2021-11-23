import React, { Component } from 'react';
import PhaseBanner from '../../common/components/phaseBanner';
import { BodyConfig } from 'shared/models/config';

class Body extends Component<BodyConfig> {
    render() {
        const {
            children,
            phaseBanner: { isVisible, ...phaseBannerProps } = { isVisible: false }
        } = this.props;
        return (
            <div className="govuk-width-container">
                {isVisible && <PhaseBanner {...phaseBannerProps} />}
                <main className="govuk-main-wrapper " id="main-content" role="main">
                    {children}
                </main>
            </div>
        );
    }
}

export default Body;
