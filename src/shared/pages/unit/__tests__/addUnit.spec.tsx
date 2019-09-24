import React from 'react';
import { match } from 'react-router';
import { createBrowserHistory, History, Location } from 'history';
import { act, render, RenderResult, wait, fireEvent, waitForElement } from '@testing-library/react';
import AddUnit from '../addUnit';
import * as UnitsService from '../../../services/unitsService';
import { State } from '../state';

let match: match<any>;
let history: History<any>;
let location: Location;
let mockState: State;
let wrapper: RenderResult;

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
        unit: {
            displayName: '',
            shortCode: ''
        }
    };
    useReducerSpy.mockImplementationOnce(() => [mockState, dispatch]);
    history.push = jest.fn();
    dispatch.mockReset();
    act(() => {
        wrapper = render(<AddUnit history={history} location={location} match={match}></AddUnit>);
    });
});

describe('when the addUnit component is mounted', () => {
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
            return await wrapper.findByLabelText('Display Name');
        });

        fireEvent.blur(displayNameElement, { target: { name: 'displayName', value: '__displayName__' } });

        await wait(() => {
            expect(dispatch).toHaveBeenCalledWith({ payload: { name: 'displayName', value: '__displayName__' }, type: 'SetUnitValues' });
        });
    });
});

describe('when the short code is entered', () => {
    it('should be persisted in the page state', async () => {
        expect.assertions(1);

        const shortCodeElement = await waitForElement(async () => {
            return await wrapper.findByLabelText('Short Code');
        });

        fireEvent.blur(shortCodeElement, { target: { name: 'shortCode', value: '__shortCode__' } });

        await wait(() => {
            expect(dispatch).toHaveBeenCalledWith({ payload: { name: 'shortCode', value: '__shortCode__' }, type: 'SetUnitValues' });
        });
    });
});

describe('when the submit button is clicked', () => {
    describe('and the data is filled in', () => {
        beforeEach(() => {
            mockState.unit = { displayName: '__displayName__', shortCode: '__shortCode__' };
        });

        describe('and the service call is successful', () => {
            beforeAll(() => {
                jest.spyOn(UnitsService, 'createUnit').mockImplementation(() => Promise.resolve());
            });

            it('should redirect to the home page', async () => {
                expect.assertions(1);

                const submitButton = await waitForElement(async () => {
                    return await wrapper.findByText('Submit');
                });

                fireEvent.click(submitButton);

                await wait(() => {
                    expect(history.push).toHaveBeenCalledWith('/');
                });
            });
        });
    });
});
