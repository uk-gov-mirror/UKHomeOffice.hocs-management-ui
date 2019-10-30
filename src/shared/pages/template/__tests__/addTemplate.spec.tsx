import React from 'react';
import { match, MemoryRouter } from 'react-router-dom';
import { createBrowserHistory, History, Location } from 'history';
import { act, render, RenderResult, wait, fireEvent, waitForElement } from '@testing-library/react';
import AddTemplate from '../addTemplate';
import * as TemplatesService from '../../../services/templatesService';
import { GENERAL_ERROR_TITLE, ADD_TEMPLATE_ERROR_DESCRIPTION, LOAD_CASE_TYPES_DESCRIPTION } from '../../../models/constants';
import Template from '../../../models/template';
import * as useError from '../../../hooks/useError';
import * as CaseTypesService from '../../../services/caseTypesService';
import { createMockFile } from '../../../../../test/createMockFile';

jest.mock('../../../services/caseTypesService', () => ({
    __esModule: true,
    getCaseTypes: () => Promise.resolve([{
        label: '__caseType1__',
        value: '__CaseTypeId1__'
    }, {
        label: '__topic2__',
        value: '__topicId2__'
    }])
}));

const getTopicsSpy = jest.spyOn(CaseTypesService, 'getCaseTypes');

let match: match<any>;
let history: History<any>;
let location: Location;
let mockTemplate: Template;
let wrapper: RenderResult;

const useReducerSpy = jest.spyOn(React, 'useReducer');
const reducerDispatch = jest.fn();
const useErrorSpy = jest.spyOn(useError, 'default');
const addFormErrorSpy = jest.fn();
const clearErrorsSpy = jest.fn();
const setMessageSpy = jest.fn();

const renderComponent = () => render(
    <MemoryRouter>
        <AddTemplate history={history} location={location} match={match}></AddTemplate>
    </MemoryRouter>
);

jest.spyOn(TemplatesService, 'addTemplate').mockImplementation(() => Promise.resolve());

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
    mockTemplate = {
        caseType: undefined,
        files: undefined
    };
    useReducerSpy.mockImplementation(() => [mockTemplate, reducerDispatch]);
    useErrorSpy.mockImplementation(() => [{}, addFormErrorSpy, clearErrorsSpy, setMessageSpy]);
    history.push = jest.fn();
    reducerDispatch.mockReset();
    addFormErrorSpy.mockReset();
    clearErrorsSpy.mockReset();
    setMessageSpy.mockReset();
    act(() => {
        wrapper = renderComponent();
    });
});

describe('when the addTemplate component is mounted', () => {
    it('should render with default props', async () => {
        expect.assertions(1);

        await wait(() => {
            expect(wrapper.container).toMatchSnapshot();
        });
    });

    it('should display an error if the call to retrieve the case types fail', async () => {
        expect.assertions(1);
        getTopicsSpy.mockImplementation(() => Promise.reject('error'));

        act(() => {
            wrapper = renderComponent();
        });

        await wait(() => {
            expect(setMessageSpy).toBeCalledWith({ title: GENERAL_ERROR_TITLE, description: LOAD_CASE_TYPES_DESCRIPTION });
        });

    });
});

describe('when the submit button is clicked', () => {
    describe('and the data is filled in', () => {

        beforeEach(async () => {
            mockTemplate.files = [createMockFile()];
            mockTemplate.caseType = {
                label: '__caseTypeLabel__',
                value: '__caseTypeValue__'
            };
            const submitButton = await waitForElement(async () => {
                return await wrapper.findByText('Submit');
            });

            fireEvent.click(submitButton);
        });

        describe('and the service call is successful', () => {
            it('should redirect to the home page', async () => {
                expect.assertions(1);

                await wait(() => {
                    expect(history.push).toHaveBeenCalledWith('/', { successMessage: 'The template was created successfully' });
                });
            });
            it('should clear any previous errors', async () => {
                expect.assertions(1);

                await wait(() => {
                    expect(clearErrorsSpy).toHaveBeenCalled();
                });
            });
        });

        describe('and the service call fails', () => {
            beforeAll(() => {
                jest.spyOn(TemplatesService, 'addTemplate').mockImplementationOnce(() => Promise.reject({ response: { status: 500 } }));
            });

            it('should set the error state', () => {
                expect(setMessageSpy).toHaveBeenCalledWith({ description: ADD_TEMPLATE_ERROR_DESCRIPTION, title: GENERAL_ERROR_TITLE });
            });

            it('should clear any previous errors', () => {
                expect(clearErrorsSpy).toHaveBeenCalled();
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
            expect(addFormErrorSpy).toHaveBeenNthCalledWith(1, { key: 'files', value: 'The Template is required' });
            expect(addFormErrorSpy).toHaveBeenNthCalledWith(2, { key: 'caseType', value: 'The Case Types is required' });
        });
    });
});
