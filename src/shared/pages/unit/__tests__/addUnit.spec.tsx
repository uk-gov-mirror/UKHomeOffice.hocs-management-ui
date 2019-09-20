import React from 'react';
import { match } from 'react-router';
import { createBrowserHistory, History, Location } from 'history';
import { act, render, RenderResult, wait } from '@testing-library/react';
import AddUnit from '../addUnit';
import Unit from '../../../models/unit';

let match: match<any>;
let history: History<any>;
let location: Location;
let mockState: Unit;

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
        displayName: '',
        shortCode: ''
    };
    useReducerSpy.mockImplementationOnce(() => [mockState, dispatch]);
    dispatch.mockReset();
});

describe('when the addToTeam component is mounted', () => {
    it('should render with default props', async () => {
        expect.assertions(1);
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<AddUnit history={history} location={location} match={match}></AddUnit>);
        });

        await wait(() => {
            expect(wrapper.container).toMatchSnapshot();
        });
    });
});
