import React from 'react';
import { MemoryRouter, match } from 'react-router';
import { createBrowserHistory, History, Location } from 'history';
import { act, render, RenderResult } from '@testing-library/react';
import AddToTeam from '../addToTeam';
import * as TeamsService from '../../../services/teamsService';
import * as UsersService from '../../../services/usersService';

let match: match<any>;
let history: History<any>;
let location: Location;

const getTeamSpy = jest.spyOn<typeof TeamsService, 'getTeam'>(TeamsService, 'getTeam').mockReturnValue(Promise.resolve({
    active: true,
    displayName: '__displayName__',
    letterName: '__letterName__',
    permissions: [],
    type: '__type__'
}));

const getUsersSpy = jest.spyOn(UsersService, 'getUsers')
    .mockReturnValue(Promise.resolve({
        data: [{
            label: '__user1__',
            value: '__userId1__'
        }, {
            label: '__user2__',
            value: '__userId2__'
        }]
    }));

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
        // @ts-ignore
        return getTeamSpy('__teamId__').then(() => {
            expect(getTeamSpy).toHaveBeenCalled();
            expect(getUsersSpy).toHaveBeenCalled();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
