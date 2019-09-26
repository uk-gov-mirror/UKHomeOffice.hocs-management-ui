import React from 'react';
import Axios from 'axios';
import { ApplicationProvider } from './contexts/application';
import Router from './router/index';
import Config from './models/config';

interface AppProps {
    config: Config;
}

const App: React.FC<AppProps> = ({ config }) => {

    const { csrf } = config;

    Axios.defaults.headers.common = {
        'CSRF-Token': csrf
    };

    return (
        <ApplicationProvider config={config}>
            <Router />
        </ApplicationProvider>
    );
};

export default App;
