import React, { Component } from 'react';
import ReactGA from 'react-ga';
import types from './actions/types';
import { Action } from './actions/index';
import { BodyProps } from '../layouts/components/body';
import { FooterProps } from '../layouts/components/footer';
import { HeaderProps } from '../layouts/components/header';
import { ErrorContent } from '../layouts/error';

interface ApplicationState {
    apiStatus?: {
        status: {
            display: string;
            timeoutPeriod: number;
            type: string;
        }
    };
    config?: any;
    dispatch(action: Action<any>): Promise<any>;
    // todo: not any
    error?: ErrorContent;
    layout?: {
        body: BodyProps;
        footer: FooterProps;
        header: HeaderProps;
    };
    track?(event: string, payload: any): void;
}

interface ApplicationProps {
    children: React.ReactElement;
    config: any;
}

const defaultState: ApplicationState = {
    dispatch: () => Promise.resolve()
};

export const Context = React.createContext<ApplicationState>(defaultState);

const reducer = (state: ApplicationState, action: Action<any>): ApplicationState => {
    // TODO: REMOVE
    /* eslint-disable-next-line  no-console*/
    console.log(`ACTION: ${action.type} PAYLOAD: ${JSON.stringify(action.payload)}`);
    // ------------
    switch (action.type) {

    case types.UNSET_ERROR:
        return { ...state, error: undefined };
    case types.CLEAR_API_STATUS:
        return { ...state, apiStatus: undefined };
    default:
        // TODO: Remove
        /* eslint-disable-next-line  no-console*/
        console.warn('Unsupported action');
        return state;
    }
};

export class ApplicationProvider extends Component<ApplicationProps, ApplicationState> {
    useAnalytics: boolean = false;

    constructor(props:ApplicationProps) {
        super(props);
        const { config } = props;

        if (config && config.analytics) {
            ReactGA.initialize(config.analytics.tracker, { titleCase: true, gaOptions: { userId: config.analytics.userId } });

            this.useAnalytics = true;
        }

        this.state = {
            ...props.config,
            apiStatus: null,
            dispatch: (action: Action<any>) => {
                try {
                    this.setState(state => reducer(state, action));
                    return Promise.resolve();
                } catch (error) {
                    return Promise.reject(error);
                }
            },
            track: this.track.bind(this)
        };
    }

    track(event: string, payload: any) {
        if (this.useAnalytics) {
            switch (event) {
            case 'EVENT':
                ReactGA.event({
                    category: payload.category,
                    action: payload.action,
                    label: payload.label
                });
                break;
            case 'PAGE_VIEW':
                ReactGA.pageview(
                    payload.path,
                    undefined,
                    payload.title
                );
                break;
            default:
                /* eslint-disable-next-line  no-console*/
                console.warn('Unsupported analytics event');
            }
        }
    }

    render() {
        const { children } = this.props;
        return (
            // todo: is it necessary/ok to use the component state to store the context state?
          <Context.Provider value={this.state}>
            {children}
          </Context.Provider>
        );
    }

}

export const ApplicationConsumer = Context.Consumer;
