import React from 'react';
import {createBrowserHistory, History, Location} from 'history';
import { act, wait, fireEvent, getByText, render, RenderResult } from '@testing-library/react';
import * as TeamsService from '../../../../services/teamsService';
import { State } from '../state';
import * as useError from '../../../../hooks/useError';
import { match, MemoryRouter } from 'react-router-dom';
import TopicView from "../topicView";

let match: match<any>;
let history: History<any>;
let location: Location;
let mockState: State;

jest.mock('../../../../services/teamsService', () => ({
    __esModule: true,
    getTeams: jest.fn().mockReturnValue(Promise.resolve([{
        label: 'Home Office General Property',
        value: '1aa9055d-0572-436b-a69d-4a97588f4ce4'
    }, {
        label: 'Home Office General Property',
        value: '1aa9055d-0572-436b-a69d-4a97588f4ce4'
    }]))
}));

const getTeamsSpy = jest.spyOn(TeamsService, 'getTeams');
const useReducerSpy = jest.spyOn(React, 'useReducer');
const useErrorSpy = jest.spyOn(useError, 'default');

const renderComponent = () => render(
    <MemoryRouter>
        <TopicView history={history} location={location} match={match}></TopicView>
    </MemoryRouter>
);

beforeEach(() => {
    history = createBrowserHistory();
    mockState = {
        topicName: '__topicName__',
        privateMinisterTeam: '__privateMinisterTeam__',
        draftQATeam:'__draftQATeam__'
    };
    useReducerSpy.mockImplementationOnce(() => [mockState, jest.fn()]);
    useErrorSpy.mockImplementation(() => [{}, jest.fn(), jest.fn(), jest.fn()]);
});

describe('when the topicView component is mounted', () => {
    it.skip('should render with default props', async () => {
        expect.assertions(2);
        let wrapper: RenderResult;
        act(() => {
            wrapper = renderComponent();
        });

        await wait(() => {
            expect(getTeamsSpy).toHaveBeenCalled();
            expect(wrapper.container).toMatchSnapshot();
        });
    });
});

describe('when the confirm and submit button is clicked', () => {
    it.skip('should push a new page into the history', async () => {
        history.push = jest.fn();
        let wrapper: RenderResult;
        act(() => {
            wrapper = renderComponent();
        });

        await wait(async () => {
            const submitButton = getByText(wrapper.container, 'Submit');
            fireEvent.click(submitButton);
        });

        expect(history.push).toHaveBeenCalledWith('/topic/__topicValue__');
    });
});
