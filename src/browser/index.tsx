import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/index';
import '../styles/app.scss';

document.body.className = 'govuk-template__body js-enabled';
hydrate(
    <BrowserRouter>
        <App config={(window as any).__INITIAL_DATA__} />
    </BrowserRouter>,
    document.getElementById('app')
);
