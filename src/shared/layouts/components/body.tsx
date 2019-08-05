import React, { Component } from 'react';
import PhaseBanner, { PhaseBannerComponentProps } from '../../common/components/phase-banner';

export interface BodyProps {
    phaseBanner: PhaseBannerComponentProps;
}

class Body extends Component<BodyProps> {
    render() {
        const {
            children,
            phaseBanner = { isVisible: false } as PhaseBannerComponentProps
        } = this.props;
        return (
          <div className="govuk-width-container">
            {phaseBanner.isVisible && <PhaseBanner {...phaseBanner} />}
            <main className="govuk-main-wrapper " id="main-content" role="main">
              {children}
            </main>
          </div>
        );
    }
}

export default Body;
