import React from 'react';
import TypeAhead from '../typeAhead';
import { mount, render, shallow } from 'enzyme';

const choices = [
    { label: 'Child 1', value: 'PARENT_1_CHILD_1' },
    { label: 'Child 2', value: 'PARENT_1_CHILD_2' }
];

const getOptions = () => Promise.resolve(choices);

describe('Form type ahead component (dropdown)', () => {
    it('should render with default props', () => {
        expect(
            render(<TypeAhead getOptions={getOptions} name="type-ahead" onSelectedItemChange={() => null} />)
        ).toMatchSnapshot();
    });

    it('should render with label when passed', () => {
        expect(
            render(<TypeAhead
                getOptions={getOptions}
                name="type-ahead"
                onSelectedItemChange={() => null}
                label="Type-ahead"
            />)
        ).toMatchSnapshot();
    });

    it('should render with hint when passed', () => {
        expect(
            render(<TypeAhead
                getOptions={getOptions}
                name="type-ahead"
                onSelectedItemChange={() => null}
                hint="Select an option"
            />)
        ).toMatchSnapshot();
    });

    it('should render with error when passed', () => {
        expect(
            render(<TypeAhead
                getOptions={getOptions}
                name="type-ahead"
                onSelectedItemChange={() => null}
                error="Some error message"
            />)
        ).toMatchSnapshot();
    });

    it('should render disabled when passed', () => {
        expect(
            render(<TypeAhead
                getOptions={getOptions}
                name="type-ahead"
                onSelectedItemChange={() => null}
                disabled={true}
            />)
        ).toMatchSnapshot();
    });

});

describe('Form type ahead component (select)', () => {
    it('should render with default props', () => {
        expect(
            mount(<TypeAhead getOptions={getOptions} name="type-ahead" onSelectedItemChange={() => null} />)
        ).toMatchSnapshot();
    });

    it('should set componentMounted state when mounted', () => {
        const wrapper = mount(<TypeAhead
            getOptions={getOptions}
            name="type-ahead"
            onSelectedItemChange={() => null}
        />);
        expect(wrapper.state('componentMounted')).toBeDefined();
        expect(wrapper.state('componentMounted')).toEqual(true);
        expect(wrapper.find('Select')).toHaveLength(1);
    });

    it('should render with label when passed', () => {
        expect(
            mount(<TypeAhead
                getOptions={getOptions}
                name="type-ahead"
                onSelectedItemChange={() => null}
                label="Type-ahead"
            />)
        ).toMatchSnapshot();
    });

    it('should render with hint when passed', () => {
        expect(
            mount(<TypeAhead
                getOptions={getOptions}
                name="type-ahead"
                onSelectedItemChange={() => null}
                hint="Select an option"
            />)
        ).toMatchSnapshot();
    });

    it('should render with error when passed', () => {
        expect(
            mount(<TypeAhead
                getOptions={getOptions}
                name="type-ahead"
                onSelectedItemChange={() => null}
                error="Some error message"
            />)
        ).toMatchSnapshot();
    });

    it('should render disabled when passed', () => {
        expect(
            mount(<TypeAhead
                getOptions={getOptions}
                name="type-ahead"
                onSelectedItemChange={() => null}
                disabled={true}
            />)
        ).toMatchSnapshot();
    });

    it('should execute callback on change', () => {
        const mockCallback = jest.fn();
        const value = choices[0].value;
        const wrapper = mount(
            <TypeAhead name="type-ahead" getOptions={getOptions} onSelectedItemChange={mockCallback} />
        );

        mockCallback.mockReset();
        const select = wrapper.find('Select');

        // @ts-ignore
        select.props().onChange({ value }, { action: 'select-option' });
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith({ value });
    });

    it('should execute callback on change and support null value', () => {
        const mockCallback = jest.fn();
        const wrapper = mount(
            <TypeAhead name="type-ahead" getOptions={getOptions} onSelectedItemChange={mockCallback} />
        );

        mockCallback.mockReset();
        const select = wrapper.find('Select');
        // @ts-ignore
        select.props().onChange!(null, { action: 'select-option' });
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith(null);
    });

    it('should filter search results based on input', () => {
        const mockCallback = jest.fn();
        const wrapper = shallow<TypeAhead>(
            <TypeAhead name="type-ahead" getOptions={getOptions} onSelectedItemChange={mockCallback} />
        );
        const instance = wrapper.instance();

        let filteredOptions = instance.filterItems('Child 1', choices);
        expect(filteredOptions).toBeDefined();
        expect(filteredOptions.length).toEqual(1);

        filteredOptions = instance.filterItems('Child', choices);
        expect(filteredOptions).toBeDefined();
        expect(filteredOptions.length).toEqual(2);
    });

    it('should return an empty array when no match', () => {
        const mockCallback = jest.fn();
        const wrapper = shallow<TypeAhead>(
            <TypeAhead name="type-ahead" getOptions={getOptions} onSelectedItemChange={mockCallback} />
        );
        const instance = wrapper.instance();

        const filteredOptions = instance.filterItems('__missing__', choices);
        expect(filteredOptions).toBeDefined();
        expect(filteredOptions.length).toEqual(0);
    });

    it('should return all items for an empty search criteria', () => {
        const mockCallback = jest.fn();
        const wrapper = shallow<TypeAhead>(
            <TypeAhead name="type-ahead" getOptions={getOptions} onSelectedItemChange={mockCallback} />
        );
        const instance = wrapper.instance();

        const filteredOptions = instance.filterItems('', choices);
        expect(filteredOptions).toBeDefined();
        expect(filteredOptions.length).toEqual(2);
    });

});
