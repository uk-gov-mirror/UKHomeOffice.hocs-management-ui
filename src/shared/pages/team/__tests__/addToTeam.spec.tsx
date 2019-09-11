import React from 'react';
import { MemoryRouter, match } from 'react-router';
import { createBrowserHistory, History, Location } from 'history';
import { act, render, RenderResult, wait } from '@testing-library/react';
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

describe('addToTeam component', () => {
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
