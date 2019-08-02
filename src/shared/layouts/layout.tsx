import React, { Component, Fragment } from 'react';
import Header, { HeaderProps } from './components/header';
import Body, { BodyProps } from './components/body';
import Footer, { FooterProps } from './components/footer';
import Notification from './notification';
import { ApplicationConsumer } from '../contexts/application';

interface LayoutProps {
    apiStatus: {
        status: {
            display: string;
            timeoutPeriod: number;
            type: string;
        }
    };
    layout: {
        body: BodyProps;
        footer: FooterProps;
        header: HeaderProps;
    };
}

class Layout extends Component<LayoutProps> {

    constructor(props: LayoutProps) {
        super(props);
    }

    render() {
        const {
            apiStatus,
            children,
            layout: { header, body, footer }
        } = this.props;
        return (
          <Fragment>
            {apiStatus && <Notification {...apiStatus.status} />}
            <Header {...header} />
            <Body {...body}>
              {children}
            </Body>
            {footer.isVisible && <Footer {...footer} />}
          </Fragment>
        );
    }
}

const WrappedLayout: React.FC = ({ children }) => (
  <ApplicationConsumer>
    {({
            apiStatus,
            layout
        }) => <Layout children={children} layout={layout!} apiStatus={apiStatus!} />}
  </ApplicationConsumer>
);

export default WrappedLayout;
