
import React from 'react';
import { match, MemoryRouter } from 'react-router-dom';
import { createBrowserHistory, History, Location } from 'history';
import { act, render, RenderResult, wait, fireEvent, getByText } from '@testing-library/react';
import AddNominatedContact from '../addNominatedContact';
import * as NominatedContactsService from '../../../../services/nominatedContactsService';
import * as TeamsService from '../../../../services/teamsService';
import {
    GENERAL_ERROR_TITLE,
    LOAD_TEAM_ERROR_DESCRIPTION
} from '../../../../models/constants';
import { State } from '../state';
import * as useError from '../../../../hooks/useError';

jest.mock('../../../../services/teamsService', () => ({
    __esModule: true,
    getTeam: jest.fn().mockReturnValue(Promise.resolve({
        active: true,
        displayName: '__displayName__',
        letterName: '__letterName__',
        permissions: [],
        type: '__type__'
    }))
}));

jest.mock('../../../../services/nominatedContactsService', () => ({
    __esModule: true,
    addNominatedContact: jest.fn().mockReturnValue(Promise.resolve())
}));

let match: match<any>;
let history: History<any>;
let location: Location;
let mockState: State;

const useReducerSpy = jest.spyOn(React, 'useReducer');
const getTeamSpy = jest.spyOn(TeamsService, 'getTeam');
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

const addNominatedContactSpy = jest.spyOn(NominatedContactsService, 'addNominatedContact');

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
    mockState = {
        inputValue: '',
        selectedContacts: [{
            label: '__user1__',
            value: '__user1__'
        }, {
            label: '__user2__',
            value: '__user2__'
        }],
        teamName: '__teamName__',
        teamUUID: '__teamUUID__'
    };

    useReducerSpy.mockImplementation(() => [mockState, reducerDispatch]);
    useErrorSpy.mockImplementation(() => [{}, addFormErrorSpy, clearErrorsSpy, setMessageSpy]);
    history.push = jest.fn();
    reducerDispatch.mockReset();
    addFormErrorSpy.mockReset();
    clearErrorsSpy.mockReset();
    setMessageSpy.mockReset();
});

describe('when the addNominatedContact component is mounted', () => {
    it('should render with default props', async () => {
        let wrapper: RenderResult;
        act(() => {
            wrapper = renderComponent();
        });
        expect.assertions(1);

        await wait(() => {
            expect(wrapper.container).toMatchSnapshot();
        });
    });

    it('should initially render null before the team name is returned', async () => {
        let wrapper: RenderResult;
        getTeamSpy.mockReturnValueOnce(Promise.resolve({
            active: true,
            displayName: undefined,
            letterName: '__letterName__',
            permissions: [],
            type: '__type__'
        }));
        mockState.teamName = undefined;
        wrapper = renderComponent();
        expect(wrapper.container.outerHTML).toMatchSnapshot();
    });
    it('should display an error if the call to retrieve the team fails', async () => {
        expect.assertions(1);
        getTeamSpy.mockImplementation(() => Promise.reject('error'));

        renderComponent();

        await wait(() => {
            expect(setMessageSpy).toBeCalledWith({ title: GENERAL_ERROR_TITLE, description: LOAD_TEAM_ERROR_DESCRIPTION });
        });

    });
});

describe('when the submit button is clicked', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        act(() => {
            wrapper = renderComponent();
        });
    });

    it('should call the service and dispatch actions for the selected options', async () => {
        await wait(async () => {
            const submitButton = getByText(wrapper.container, 'Submit');
            fireEvent.click(submitButton);
        });

        await wait(async () => {

            expect(addNominatedContactSpy).nthCalledWith(1, {
                emailAddress: '__user1__',
                teamUUID: '__teamUUID__'
            });
            expect(addNominatedContactSpy).nthCalledWith(2, {
                emailAddress: '__user2__',
                teamUUID: '__teamUUID__'
            });
            expect(clearErrorsSpy).toBeCalled();

            expect(reducerDispatch).nthCalledWith(1, {
                type: 'RemoveFromSelection', payload: {
                    label: '__user1__',
                    value: '__user1__'
                }
            });
            expect(reducerDispatch).nthCalledWith(2, {
                type: 'RemoveFromSelection', payload: {
                    label: '__user2__',
                    value: '__user2__'
                }
            });
        });
    });

    it('should display errors for each erroring team member add request', async () => {
        expect.assertions(2);
        addNominatedContactSpy.mockImplementation(() => Promise.reject({
            response: {
                status: 409
            }
        }));

        await wait(() => {
            const submitButton = getByText(wrapper.container, 'Submit');
            fireEvent.click(submitButton);
        });

        expect(setMessageSpy).nthCalledWith(1, { description: 'There was an error retrieving the team.  Please try refreshing the page.', title: 'Something went wrong' });
        expect(setMessageSpy).nthCalledWith(2, { description: 'A nominated contact with those email details already exists', title: 'There was a error validating the response' });

    });

    it('should set an error when no users are selected', async () => {
        mockState.selectedContacts = [];
        await wait(async () => {
            const submitButton = getByText(wrapper.container, 'Submit');
            fireEvent.click(submitButton);
        });

        await wait(async () => {
            expect(setMessageSpy).toBeCalledWith({
                description: 'Add at least one nominated contact before submitting.',
                title: 'No nominated contact specified'
            });
        });
    });
});

describe('when the remove button is clicked', () => {
    it('should remove the row from the selected contact collection', async () => {
        let wrapper: RenderResult;
        act(() => {
            wrapper = renderComponent();
        });

        await wait(async () => {
            const selectedContact = getByText(wrapper.container, '__user1__');
            const row = (selectedContact.closest('tr'));
            const removeButton = getByText(row as HTMLElement, 'Remove');
            fireEvent.click(removeButton);
        });

        expect(reducerDispatch).nthCalledWith(1, { type: 'RemoveFromSelection', payload: { label: '__user1__', value: '__user1__' } });
    });
});
