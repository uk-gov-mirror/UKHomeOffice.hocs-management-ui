import React from 'react';
import { ApplicationProvider } from './contexts/application';
import Router from './router/index';

interface AppProps {
    config: {
        layout: {
            header: string,
            body: string,
            footer: string
        };
    };
}

const App: React.FC<AppProps> = ({ config }) => (
    <ApplicationProvider config={config}>
        <Router />
    </ApplicationProvider>
);

export default App;
