import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Backlink from '../backlink';

describe('Form backlink component', () => {

    const mockDispatch = jest.fn();

    beforeEach(() => {
        mockDispatch.mockReset();
    });

    it('should render with default props', () => {
        const wrapper = mount(
          <MemoryRouter>
            <Backlink action="/SOME/URL" />
          </MemoryRouter>
        );
        expect(wrapper).toBeDefined();
        expect(wrapper.find('BackLink')).toMatchSnapshot();
    });

    it('should render disabled when isDisabled is passed', () => {
        const wrapper = mount(
          <MemoryRouter>
            <Backlink disabled action="/SOME/URL" />
          </MemoryRouter>
        );
        expect(wrapper).toBeDefined();
        expect(wrapper.find('BackLink')).toMatchSnapshot();
        expect(wrapper.find('Link').props().disabled).toEqual(true);
    });

    it('should render with correct label when passed', () => {
        const wrapper = mount(
          <MemoryRouter>
            <Backlink label='MY_LABEL' action="/SOME/URL" />
          </MemoryRouter>
        );
        expect(wrapper).toBeDefined();
        expect(wrapper.find('BackLink')).toMatchSnapshot();
        expect(wrapper.find('Link').props().children).toEqual('MY_LABEL');
    });

    it('should render with additional styles when className is passed', () => {
        const wrapper = mount(
          <MemoryRouter>
            <Backlink className='test-class' action="/SOME/URL" />
          </MemoryRouter>
        );
        expect(wrapper).toBeDefined();
        expect(wrapper.find('BackLink')).toMatchSnapshot();
        expect(wrapper.find('Link').props().className).toEqual('govuk-back-link test-class');
    });

});