import React from 'react';
import { match } from 'react-router';
import { createBrowserHistory, History, Location } from 'history';
import { act, render, RenderResult, wait, fireEvent, waitForElement } from '@testing-library/react';
import AddChildTopic from '../addChildTopic';
import * as TopicsService from '../../../services/topicsService';
import { GENERAL_ERROR_TITLE, VALIDATION_ERROR_TITLE, DUPLICATE_CHILD_TOPIC_DESCRIPTION, ADD_CHILD_TOPIC_ERROR_DESCRIPTION, LOAD_PARENT_TOPICS_ERROR_DESCRIPTION } from '../../../models/constants';
import * as useError from '../../../hooks/useError';
import { State } from '../state';

let match: match<any>;
let history: History<any>;
let location: Location;
let mockState: State;
let wrapper: RenderResult;

const useReducerSpy = jest.spyOn(React, 'useReducer');
const reducerDispatch = jest.fn();
const useErrorSpy = jest.spyOn(useError, 'default');
const addFormErrorSpy = jest.fn();
const clearErrorsSpy = jest.fn();
const setMessageSpy = jest.fn();

jest.mock('../../../services/topicsService', () => ({
    __esModule: true,
    addChildTopic: () => Promise.resolve(),
    getParentTopics: () => Promise.resolve({
        data: [{
            label: '__parentTopic1__',
            value: '__parentTopicId1__'
        }, {
            label: '__parentTopic2__',
            value: '__parentTopicId2__'
        }]
    })
}));

const getParentTopicsSpy = jest.spyOn(TopicsService, 'getParentTopics');

beforeEach(() => {
    history = createBrowserHistory();
    match = {
        isExact: true,
        params: {},
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
        parentTopics: []
    };
    useReducerSpy.mockImplementation(() => [mockState, reducerDispatch]);
    useErrorSpy.mockImplementation(() => [{}, addFormErrorSpy, clearErrorsSpy, setMessageSpy]);
    history.push = jest.fn();
    reducerDispatch.mockReset();
    addFormErrorSpy.mockReset();
    clearErrorsSpy.mockReset();
    setMessageSpy.mockReset();
    act(() => {
        wrapper = render(<AddChildTopic history={history} location={location} match={match}></AddChildTopic>);
    });
});

describe('when the addUnit component is mounted', () => {
    it('should render with default props', async () => {
        expect.assertions(2);

        await wait(() => {
            expect(getParentTopicsSpy).toHaveBeenCalled();
            expect(wrapper.container).toMatchSnapshot();
        });
    });

    it('should display an error if the call to retrieve the users fails', async () => {
        expect.assertions(1);
        getParentTopicsSpy.mockImplementation(() => Promise.reject('error'));

        act(() => {
            wrapper = render(<AddChildTopic history={history} location={location} match={match}></AddChildTopic>);
        });

        await wait(() => {
            expect(setMessageSpy).toBeCalledWith({ title: GENERAL_ERROR_TITLE, description: LOAD_PARENT_TOPICS_ERROR_DESCRIPTION });
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
            expect(reducerDispatch).toHaveBeenCalledWith({ payload: '__displayName__', type: 'SetDisplayName' });
        });
    });
});

describe('when the submit button is clicked', () => {
    describe('and the data is filled in', () => {

        beforeEach(async () => {
            mockState.displayName = '__displayName__';
            mockState.selectedParentTopic = { label: '__label__', value: '__value__' };
            const submitButton = await waitForElement(async () => {
                return await wrapper.findByText('Submit');
            });

            fireEvent.click(submitButton);
        });

        describe('and the service call is successful', () => {
            it('should redirect to the home page', async () => {
                expect.assertions(1);

                await wait(() => {
                    expect(history.push).toHaveBeenCalledWith('/');
                });
            });
            it('should call the begin submit action', async () => {
                expect.assertions(1);

                await wait(() => {
                    expect(clearErrorsSpy).toHaveBeenCalled();
                });
            });
        });

        describe('and the service call fails', () => {
            beforeAll(() => {
                jest.spyOn(TopicsService, 'addChildTopic').mockImplementationOnce(() => Promise.reject({ response: { status: 500 } }));
            });

            it('should set the error state', () => {
                expect(setMessageSpy).toHaveBeenCalledWith({ description: ADD_CHILD_TOPIC_ERROR_DESCRIPTION, title: GENERAL_ERROR_TITLE });
            });
            it('should call the begin submit action', () => {
                expect(clearErrorsSpy).toHaveBeenCalled();
            });
        });
        describe('and the service call fails with a 409', () => {
            beforeAll(() => {
                jest.spyOn(TopicsService, 'addChildTopic').mockImplementationOnce(() => Promise.reject({ response: { status: 409 } }));
            });

            it('should set the error state', () => {
                expect(setMessageSpy).toHaveBeenCalledWith({ description: DUPLICATE_CHILD_TOPIC_DESCRIPTION, title: VALIDATION_ERROR_TITLE });
            });
        });
    });
    describe('and the data is not filled in', () => {
        beforeEach(async () => {
            const submitButton = await waitForElement(async () => {
                return await wrapper.findByText('Submit');
            });

            fireEvent.click(submitButton);
        });

        it('should call the begin submit action', () => {
            expect(clearErrorsSpy).toHaveBeenCalled();
        });

        it('should set the error state', () => {
            expect(addFormErrorSpy).toHaveBeenNthCalledWith(1, { key: 'displayName', value: 'A Display Name is required' });
            expect(addFormErrorSpy).toHaveBeenNthCalledWith(2, { key: 'selectedParentTopic.label', value: 'A Parent Topic is required' });
        });
    });
});

describe('when the back link is clicked', () => {
    it('will navigate to the homepage', async () => {
        expect.assertions(1);

        const backButton = await waitForElement(async () => {
            return await wrapper.findByText('Back');
        });

        fireEvent.click(backButton);

        await wait(() => {
            expect(history.push).toHaveBeenCalledWith('/');
        });
    });
});
