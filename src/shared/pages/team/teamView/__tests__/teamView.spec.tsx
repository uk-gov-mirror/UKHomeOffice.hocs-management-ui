import React from 'react';
import { match } from 'react-router';
import { createBrowserHistory, History, Location } from 'history';
import { act, wait, fireEvent, getByText, render, RenderResult } from '@testing-library/react';
import TeamView from '../teamView';
import * as TeamsService from '../../../../services/teamsService';
import * as UsersService from '../../../../services/usersService';
import { State } from '../state';

let match: match<any>;
let history: History<any>;
let location: Location;
let mockState: State;

jest.mock('../../../../services/teamsService', () => ({
    __esModule: true,
    getTeamMembers: jest.fn().mockReturnValue(Promise.resolve({
        data: [{
            label: '__user1__',
            value: '__userId1__'
        }, {
            label: '__user2__',
            value: '__userId2__'
        }]
    })),
    getTeam: jest.fn().mockReturnValue(Promise.resolve({
        active: true,
        displayName: '__displayName__',
        letterName: '__letterName__',
        permissions: [],
        type: '__type__'
    }))
}));

jest.mock('../../../../services/usersService', () => ({
    __esModule: true,
    addUserToTeam: jest.fn().mockReturnValue(Promise.resolve()),
    deleteUserFromTeam: jest.fn().mockReturnValue(Promise.resolve()),
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
const getTeamMembersSpy = jest.spyOn(TeamsService, 'getTeamMembers');
const deleteUserFromTeamSpy = jest.spyOn(UsersService, 'deleteUserFromTeam');
const useReducerSpy = jest.spyOn(React, 'useReducer');
const dispatch = jest.fn();

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
        errorDescription: '',
        errorTitle: '',
        teamMembersLoaded: true,
        teamMembers: [{
            label: '__user1__',
            value: '__userId1__'
        }, {
            label: '__user2__',
            value: '__userId2__'
        }],
        teamName: '__teamName__'
    };
    useReducerSpy.mockImplementationOnce(() => [mockState, dispatch]);
    dispatch.mockReset();
});

describe('when the teamView component is mounted', () => {
    it('should render with default props', async () => {
        expect.assertions(3);
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<TeamView history={history} location={location} match={match}></TeamView>);
        });

        await wait(() => {
            expect(getTeamSpy).toHaveBeenCalled();
            expect(getTeamMembersSpy).toHaveBeenCalled();
            expect(wrapper.container).toMatchSnapshot();
        });
    });
});

describe('when the back button is clicked', () => {
    it('should push a new page into the history', async () => {
        history.push = jest.fn();
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<TeamView history={history} location={location} match={match}></TeamView>);
        });

        await wait(async () => {
            const backButton = getByText(wrapper.container, 'Back');
            fireEvent.click(backButton);
        });

        expect(history.push).toHaveBeenCalledWith('/team-search');
    });
});

describe('when the Add team members button is clicked', () => {
    it('should push a new page into the history', async () => {
        history.push = jest.fn();
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<TeamView history={history} location={location} match={match}></TeamView>);
        });

        await wait(async () => {
            const addTeamMembersButton = getByText(wrapper.container, 'Add team members');
            fireEvent.click(addTeamMembersButton);
        });

        expect(history.push).toHaveBeenCalledWith('/team/__teamId__/add-users');
    });
});

describe('when the remove user button is clicked', () => {
    it('should remove the row from the users table', async () => {
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<TeamView history={history} location={location} match={match}></TeamView>);
        });

        await wait(async () => {
            const selectedUser = getByText(wrapper.container, '__user1__');
            dispatch.mockReset();
            const row = (selectedUser.closest('tr'));
            const removeButton = getByText(row as HTMLElement, 'Remove');
            fireEvent.click(removeButton);
        });

        expect(deleteUserFromTeamSpy).nthCalledWith(1,  '__userId1__', '__teamId__');
        expect(getTeamMembersSpy).nthCalledWith(1, '__teamId__');

    });
});
