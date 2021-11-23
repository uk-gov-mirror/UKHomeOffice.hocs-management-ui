import React from 'react';
import { render, shallow } from 'enzyme';
import Checkbox from '../checkbox';

describe('Form checkbox component', () => {
    it('should render with value true', () => {
        expect(
            render(<Checkbox label="Label1-ticked" name="Name1" updateState={() => null} value="true" />)
        ).toMatchSnapshot();
    });

    it('should render with value false', () => {
        expect(
            render(<Checkbox label="Label2-not-ticked" name="Name2" updateState={() => null} value="false" />)
        ).toMatchSnapshot();
    });

    it('should execute callback on change, new value is true if currently true', () => {
        const mockCallback = jest.fn();
        const fieldName = 'checkbox-one';
        const event = { target: { name: fieldName, value: 'Text value' } };
        const wrapper = shallow(
            <Checkbox name={fieldName} updateState={mockCallback} value="true" />
        );
        mockCallback.mockReset();
        wrapper.find('input').simulate('change', event);
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith({ name: fieldName, value: 'false' });
    });

    it('should execute callback on change, new value is true if currently false', () => {
        const mockCallback = jest.fn();
        const fieldName = 'checkbox-one';
        const event = { target: { name: fieldName, value: 'Text value' } };
        const wrapper = shallow(
            <Checkbox name={fieldName} updateState={mockCallback} value="false" />
        );
        mockCallback.mockReset();
        wrapper.find('input').simulate('change', event);
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith({ name: fieldName, value: 'true' });
    });

});
