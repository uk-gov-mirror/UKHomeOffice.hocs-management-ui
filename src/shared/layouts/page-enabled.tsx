import React, { Component, Fragment } from 'react';
import { ApplicationConsumer } from '../contexts/application';
import { unsetError, clearApiStatus, Action } from '../contexts/actions';
import Error, { ErrorContent } from './error';

interface PageWrapperProps {
    dispatch(action: Action<any>): Promise<any>;
    // todo: not any
    track: any;
    error?: ErrorContent;
    match: any;
}

class PageWrapper extends Component<PageWrapperProps> {

    constructor(props: PageWrapperProps) {
        super(props);
    }

    componentWillUnmount() {
        const { dispatch, error } = this.props;
        if (error) {
            dispatch(unsetError()).then(() => dispatch(clearApiStatus()));
        }
    }

    // tslint:disable-next-line: function-name
    UNSAFE_componentWillReceiveProps(nextProps: PageWrapperProps) {
        const { track } = this.props;
        const nextPage = nextProps.match.url;

        if (nextProps.error && nextProps.error.status) {
            track('PAGE_VIEW', { title: `Error: ${nextProps.error.status}`, path: nextPage });
        }
    }

    render() {
        const { children, error } = this.props;
        return (
            <Fragment>
                {error ? <Error error={error} /> : children}
            </Fragment>
        );
    }
}
interface PageEnabledWrapperProps {
    children: React.ReactElement;
    match: any;
}

const PageEnabledWrapper: React.FC<PageEnabledWrapperProps> = props => (
    <ApplicationConsumer>
        {({ dispatch, error, track }) => (
            <PageWrapper
                {...props}
                dispatch={dispatch!}
                track={track}
                error={error}
            />
        )}
    </ApplicationConsumer>
);

export default PageEnabledWrapper;
