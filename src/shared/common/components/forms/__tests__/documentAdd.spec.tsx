import React from 'react';
import { mount, render, shallow } from 'enzyme';
import DocumentAdd from '../documentAdd';

const FIELD_NAME = 'add-document';

describe('Document add component', () => {

    it('should render with default props', () => {
        const wrapper = render(<DocumentAdd name={FIELD_NAME} updateState={() => null} />);
        expect(wrapper).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });

    it('should render disabled when passed', () => {
        const wrapper = mount(<DocumentAdd name={FIELD_NAME} updateState={() => null} disabled={true} />);
        expect(wrapper).toBeDefined();
        expect(wrapper.find('DocumentAdd').props().disabled).toEqual(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('should allow multiple files when passed', () => {
        const wrapper = mount(<DocumentAdd name={FIELD_NAME} updateState={() => null} allowMultiple={true} />);
        expect(wrapper).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with correct label when passed', () => {
        const label = 'MY_LABEL';
        const wrapper = mount(<DocumentAdd name={FIELD_NAME} updateState={() => null} label={label} />);
        expect(wrapper).toBeDefined();
        expect(wrapper.find('DocumentAdd').props().label).toEqual(label);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with validation error when passed', () => {
        const error = 'MY_ERROR';
        const wrapper = mount(<DocumentAdd name={FIELD_NAME} updateState={() => null} error={error} />);
        expect(wrapper).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with hint when passed', () => {
        const hint = 'MY_HINT';
        const wrapper = mount(<DocumentAdd name={FIELD_NAME} updateState={() => null} hint={hint} />);
        expect(wrapper).toBeDefined();
        expect(wrapper).toMatchSnapshot();

    });

    it('should execute callback on change', () => {
        const event = { target: { files: [] }, preventDefault: jest.fn() };
        const mockCallback = jest.fn();
        const wrapper = shallow(
            <DocumentAdd name={FIELD_NAME} updateState={mockCallback} />
        );
        mockCallback.mockReset();
        wrapper.find('input').simulate('change', event);
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith({ name: FIELD_NAME, value: [] });
    });
});
