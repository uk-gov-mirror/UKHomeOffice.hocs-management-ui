
import React from 'react';
import { match, MemoryRouter } from 'react-router-dom';
import { createBrowserHistory, History, Location } from 'history';
import { act, render, RenderResult, wait, fireEvent, waitForElement } from '@testing-library/react';
import AddNominatedContact from '../addNominatedContact';
import * as NominatedContactsService from '../../../../services/nominatedContactsService';
import {
    ADD_NOMINATED_CONTACT_ERROR_DESCRIPTION,
    DUPLICATE_NOMINATED_CONTACT_DESCRIPTION,
    GENERAL_ERROR_TITLE,
    VALIDATION_ERROR_TITLE
} from '../../../../models/constants';
import NominatedContact from '../../../../models/nominatedContact';
import * as useError from '../../../../hooks/useError';

let match: match<any>;
let history: History<any>;
let location: Location;
let mockNominatedContact: NominatedContact;
let wrapper: RenderResult;

const useReducerSpy = jest.spyOn(React, 'useReducer');
const reducerDispatch = jest.fn();
const useErrorSpy = jest.spyOn(useError, 'default');
const addFormErrorSpy = jest.fn();
const clearErrorsSpy = jest.fn();
const setMessageSpy = jest.fn();

const renderComponent = () => render(
    <MemoryRouter>
        <AddNominatedContact history={history} location={location} match={match}></AddNominatedContact>
    </MemoryRouter>
);

jest.spyOn(NominatedContactsService, 'addNominatedContact').mockImplementation(() => Promise.resolve());

beforeEach(() => {
    history = createBrowserHistory();
    match = {
        isExact: true,
        params: { teamId: '__teamId__' },
        path: '',
        url: ''
    };

    location = {
        hash: '',
        key: '',
        pathname: '',
        search: '',
        state: {}
    };
    mockNominatedContact = {
        emailAddress: '',
        teamName: '',
        teamUUID: ''
    };
    useReducerSpy.mockImplementation(() => [mockNominatedContact, reducerDispatch]);
    useErrorSpy.mockImplementation(() => [{}, addFormErrorSpy, clearErrorsSpy, setMessageSpy]);
    history.push = jest.fn();
    reducerDispatch.mockReset();
    addFormErrorSpy.mockReset();
    clearErrorsSpy.mockReset();
    setMessageSpy.mockReset();
    act(() => {
        wrapper = renderComponent();
    });
});

describe('when the addNominatedContact component is mounted', () => {
    it('should render with default props', async () => {
        expect.assertions(1);

        await wait(() => {
            expect(wrapper.container).toMatchSnapshot();
        });
    });
});

describe('when the display name is entered', () => {
    it('should be persisted in the page state', async () => {
        expect.assertions(1);

        const displayNameElement = await waitForElement(async () => {
            return await wrapper.findByLabelText('Email Address');
        });

        fireEvent.change(displayNameElement, { target: { name: 'emailAddress', value: '__emailAddress__' } });

        await wait(() => {
            expect(reducerDispatch).toHaveBeenCalledWith({ name: 'emailAddress', value: '__emailAddress__' });
        });
    });
});

describe('when the submit button is clicked', () => {
    describe('and the data is filled in', () => {

        beforeEach(async () => {
            mockNominatedContact.emailAddress = 'me@there.com';
            mockNominatedContact.teamName = '__teamName__';
            mockNominatedContact.teamUUID = '__teamUUID__';
            const submitButton = await waitForElement(async () => {
                return await wrapper.findByText('Submit');
            });

            fireEvent.click(submitButton);
        });

        describe('and the service call is successful', () => {
            it('should redirect to the home page', async () => {
                expect.assertions(1);

                await wait(() => {
                    expect(history.push).toHaveBeenCalledWith('/', { successMessage: 'The nominated contact was added successfully' });
                });
            });
            it('should call the begin submit action', async () => {
                expect.assertions(1);

                await wait(() => {
                    expect(clearErrorsSpy).toHaveBeenCalled();
                });
            });
        });

        describe('and the service call fails', () => {
            beforeAll(() => {
                jest.spyOn(NominatedContactsService, 'addNominatedContact').mockImplementationOnce(() => Promise.reject({ response: { status: 500 } }));
            });

            it('should set the error state', () => {
                expect(setMessageSpy).toHaveBeenCalledWith({ description: ADD_NOMINATED_CONTACT_ERROR_DESCRIPTION, title: GENERAL_ERROR_TITLE });
            });
            it('should call the begin submit action', () => {
                expect(clearErrorsSpy).toHaveBeenCalled();
            });
        });
        describe('and the service call fails with a 409', () => {
            beforeAll(() => {
                jest.spyOn(NominatedContactsService, 'addNominatedContact').mockImplementationOnce(() => Promise.reject({ response: { status: 409 } }));
            });

            it('should set the error state', () => {
                expect(setMessageSpy).toHaveBeenCalledWith({ description: DUPLICATE_NOMINATED_CONTACT_DESCRIPTION, title: VALIDATION_ERROR_TITLE });
            });
        });
    });
    describe('and the data is not filled in', () => {
        beforeEach(async () => {
            const submitButton = await waitForElement(async () => {
                return await wrapper.findByText('Submit');
            });

            fireEvent.click(submitButton);
        });

        it('should call the begin submit action', () => {
            expect(clearErrorsSpy).toHaveBeenCalled();
        });

        it('should set the error state', () => {
            expect(addFormErrorSpy).toHaveBeenNthCalledWith(1, { key: 'emailAddress', value: 'The email address is required' });
        });
    });
});
