import React from 'react';
import { createBrowserHistory, History } from 'history';
import { act, wait, fireEvent, getByText, render, RenderResult } from '@testing-library/react';
import TeamSearch from '../teamSearch';
import * as TeamsService from '../../../../services/teamsService';
import * as useError from '../../../../hooks/useError';
import { MemoryRouter } from 'react-router-dom';
import Item from 'shared/models/item';

let history: History<any>;
let mockTeam: Item;

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
const useStateSpy = jest.spyOn(React, 'useState');
const useErrorSpy = jest.spyOn(useError, 'default');

const renderComponent = () => render(
    <MemoryRouter>
        <TeamSearch history={history}></TeamSearch>
    </MemoryRouter>
);

beforeEach(() => {
    history = createBrowserHistory();
    mockTeam = {
        label: '__teamName__',
        value: '__teamId__'
    };
    useStateSpy.mockImplementationOnce(() => [mockTeam, jest.fn()]);
    useErrorSpy.mockImplementation(() => [{}, jest.fn(), jest.fn(), jest.fn()]);
});

describe('when the teamView component is mounted', () => {
    it('should render with default props', async () => {
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

describe('when the view team button is clicked', () => {
    it('should push a new page into the history', async () => {
        history.push = jest.fn();
        let wrapper: RenderResult;
        act(() => {
            wrapper = renderComponent();
        });

        await wait(async () => {
            const addTeamMembersButton = getByText(wrapper.container, 'View team');
            fireEvent.click(addTeamMembersButton);
        });

        expect(history.push).toHaveBeenCalledWith('/team-view/__teamName__');
    });
});
