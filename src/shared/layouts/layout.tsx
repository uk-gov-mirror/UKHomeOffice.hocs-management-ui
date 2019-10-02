import React, { Component, Fragment } from 'react';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import Notification from './notification';
import { ApplicationConsumer } from '../contexts/application';
import { BodyConfig, FooterConfig, HeaderConfig } from 'shared/models/config';

interface LayoutProps {
    apiStatus: {
        display: string;
        timeoutPeriod: number;
        type: string;
    },
    layout: {
        body: BodyConfig;
        footer: FooterConfig;
        header: HeaderConfig;
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
                {apiStatus && <Notification {...apiStatus} />}
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
        {
            ({ apiStatus, layout }) => <Layout children={children} layout={layout!} apiStatus={apiStatus!} />
        }
    </ApplicationConsumer>
);

export default WrappedLayout;
