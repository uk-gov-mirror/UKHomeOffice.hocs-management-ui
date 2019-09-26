import React from 'react';
import { createBrowserHistory, History } from 'history';
import { act, wait, fireEvent, getByText, render, RenderResult } from '@testing-library/react';
import TeamSearch from '../teamSearch';
import * as TeamsService from '../../../../services/teamsService';
import { State } from '../state';

let history: History<any>;
let mockState: State;

jest.mock('../../../../services/teamsService', () => ({
    __esModule: true,
    getTeams:jest.fn().mockReturnValue(Promise.resolve({
        data: [{
            displayName: 'Home Office General Property',
            permissions: [
                {
                    caseTypeCode: 'DTEN',
                    accessLevel: 'OWNER'
                },
                {
                    caseTypeCode: 'MIN',
                    accessLevel: 'OWNER'
                },
                {
                    caseTypeCode: 'TRO',
                    accessLevel: 'OWNER'
                }
            ],
            letterName: null,
            type: '1aa9055d-0572-436b-a69d-4a97588f4ce4',
            active: true
        }, {
            displayName: 'Home Office General Property',
            permissions: [
                {
                    caseTypeCode: 'DTEN',
                    accessLevel: 'OWNER'
                },
                {
                    caseTypeCode: 'MIN',
                    accessLevel: 'OWNER'
                },
                {
                    caseTypeCode: 'TRO',
                    accessLevel: 'OWNER'
                }
            ],
            letterName: null,
            type: '1aa9055d-0572-436b-a69d-4a97588f4ce4',
            active: true
        }
        ]
    }))
}));

const getTeamsSpy = jest.spyOn(TeamsService, 'getTeams');
const useReducerSpy = jest.spyOn(React, 'useReducer');
const dispatch = jest.fn();

beforeEach(() => {
    history = createBrowserHistory();
    mockState = {
        errorDescription: '',
        errorTitle: '',
        teams: [{
            label: '__teamName1__',
            value: '__teamId1__'
        }, {
            label: '__teamName2',
            value: '__teamId2__'
        }
        ],
        teamsLoaded: true,
        teamUUID: '__teamName__'
    };
    useReducerSpy.mockImplementationOnce(() => [mockState, dispatch]);
    dispatch.mockReset();
});

describe('when the teamView component is mounted', () => {
    it('should render with default props', async () => {
        expect.assertions(2);
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<TeamSearch history={history}></TeamSearch>);
        });

        await wait(() => {
            expect(getTeamsSpy).toHaveBeenCalled();
            expect(wrapper.container).toMatchSnapshot();
        });
    });
});

describe('when the back button is clicked', () => {
    it('should push a new page into the history', async () => {
        history.push = jest.fn();
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<TeamSearch history={history}></TeamSearch>);
        });

        await wait(async () => {
            const backButton = getByText(wrapper.container, 'Back');
            fireEvent.click(backButton);
        });

        expect(history.push).toHaveBeenCalledWith('/');
    });
});

describe('when the team drop down selection is changed', () => {
    it('should add the TeamUUID of the selection', async () => {
        history.push = jest.fn();
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<TeamSearch history={history}></TeamSearch>);
        });

        await wait(async () => {
            const teamDropDown = getByText(wrapper.container, 'Back');
            fireEvent.click(teamDropDown);
        });

        expect(history.push).toHaveBeenCalledWith('/');
    });
});

describe('when the view team button is clicked', () => {
    it('should push a new page into the history', async () => {
        history.push = jest.fn();
        let wrapper: RenderResult;
        act(() => {
            wrapper = render(<TeamSearch history={history}></TeamSearch>);
        });

        await wait(async () => {
            const addTeamMembersButton = getByText(wrapper.container, 'View team');
            fireEvent.click(addTeamMembersButton);
        });

        expect(history.push).toHaveBeenCalledWith('/team-view/__teamName__');
    });
});
