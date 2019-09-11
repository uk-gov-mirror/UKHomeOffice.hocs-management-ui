import React from 'react';
import { MemoryRouter, match } from 'react-router';
import { createBrowserHistory, History, Location } from 'history';
import { act, render, RenderResult, wait, fireEvent, getByText } from '@testing-library/react';
import AddToTeam from '../addToTeam';
import * as TeamsService from '../../../services/teamsService';
import * as UsersService from '../../../services/usersService';

let match: match<any>;
let history: History<any>;
let location: Location;

jest.mock('../../../services/teamsService', () => ({
    __esModule: true,
    getTeam: jest.fn().mockReturnValue(Promise.resolve({
        active: true,
        displayName: '__displayName__',
        letterName: '__letterName__',
        permissions: [],
        type: '__type__'
    }))
}));

jest.mock('../../../services/usersService', () => ({
    __esModule: true,
    addUserToTeam: jest.fn().mockReturnValue(Promise.resolve()),
    getUsers: jest.fn().mockReturnValue(Promise.resolve({
        data: [{
            label: '__user1__',
            value: '__userId1__'
        }, {
            label: '__user2__',
            value: '__userId2__'
        }]
    }))
}));

const getTeamSpy = jest.spyOn(TeamsService, 'getTeam');
const addUsersToTeamSpy = jest.spyOn(UsersService, 'addUserToTeam');
const getUsersSpy = jest.spyOn(UsersService, 'getUsers');

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
});

describe('when the addToTeam component is mounted', () => {
    it('should render with default props', async () => {
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<MemoryRouter><AddToTeam history={history} location={location} match={match}></AddToTeam></MemoryRouter>);
        });

        await wait(() => {
            expect(getTeamSpy).toHaveBeenCalled();
            expect(getUsersSpy).toHaveBeenCalled();
            expect(wrapper.container).toMatchSnapshot();
        });
    });
});

describe('when the submit button is clicked', () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    const mockState = {
        errorDescription: '',
        errorTitle: '',
        inputValue: '',
        errors: undefined,
        selectedUser: undefined,
        selectedUsers: [{
            label: '__user1__',
            value: '__userId1__'
        }, {
            label: '__user2__',
            value: '__userId2__'
        }],
        teamName: '__teamName__',
        users: []
    };
    useReducerSpy.mockImplementation(() => [mockState, dispatch]);

    let wrapper: RenderResult;

    beforeEach(() => {
        act(() => {
            wrapper = render(<MemoryRouter><AddToTeam history={history} location={location} match={match}></AddToTeam></MemoryRouter>);
        });
        dispatch.mockReset();
    });

    it('should call the service and dispach actions for the selected options', async () => {

        await wait(async () => {
            const submitButton = getByText(wrapper.container, 'Add selected users');
            fireEvent.click(submitButton);
        });

        await wait(async () => {
            expect(addUsersToTeamSpy).nthCalledWith(1, {
                label: '__user1__',
                value: '__userId1__'
            }, '__teamId__');
            expect(addUsersToTeamSpy).nthCalledWith(2, {
                label: '__user2__',
                value: '__userId2__'
            }, '__teamId__');
            expect(dispatch).nthCalledWith(3, {
                type: 'BeginSubmit'
            });
            expect(dispatch).nthCalledWith(4, {
                type: 'RemoveFromSelection', payload: {
                    label: '__user1__',
                    value: '__userId1__'
                }
            });
            expect(dispatch).nthCalledWith(5, {
                type: 'RemoveFromSelection', payload: {
                    label: '__user2__',
                    value: '__userId2__'
                }
            });
        });
    });

    it('should set an error when no users are selected', async () => {
        mockState.selectedUsers = [];
        await wait(async () => {
            const submitButton = getByText(wrapper.container, 'Add selected users');
            fireEvent.click(submitButton);
        });

        await wait(async () => {
            expect(dispatch).nthCalledWith(3, {
                type: 'SetEmptySumbitError'
            });
        });
    });
});
