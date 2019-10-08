import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { ActionMeta } from 'react-select/src/types';
import Item from '../../models/item';

interface TypeAheadProps {
    choices?: Item[];
    clearable?: boolean;
    disabled?: boolean;
    error?: string;
    getOptions?: () => Promise<Item[]>;
    hint?: string;
    label?: string;
    name: string;
    onSelectedItemChange: (newItem: Item) => void;
    value?: Item | string;
}

interface TypeAheadState {
    componentMounted: boolean;
    cachedOptions?: Item[];
}

class TypeAhead extends Component<TypeAheadProps, TypeAheadState> {

    constructor(props: TypeAheadProps) {
        super(props);
        this.state = {
            componentMounted: false
        };
    }

    componentDidMount() {
        this.setState({ componentMounted: true });
    }

    handleChange(selectedItem: Item, action: ActionMeta) {
        if (action.action === 'select-option') {
            this.props.onSelectedItemChange(selectedItem);
        }
    }

    getOptions(input: string, callback: (options: Item[]) => void) {
        let options: Item[];
        if (this.props.choices && input.length > 0) {
            const searchString = input.toLowerCase().trim();
            options = this.props.choices
                .filter(item => item.label.toLowerCase().indexOf(searchString) !== -1)
                .slice(0, 100);
        } else {
            options = [];
        }

        return callback(options);
    }

    filterItems = (inputValue: string, items: Item[]) => items
        .filter(item => item
            .label
            .toLocaleLowerCase()
            .indexOf(inputValue.toLocaleLowerCase().trim()) !== -1)

    promiseOptions = (inputValue: string) =>
        new Promise<Item[]>((resolve) => {
            if (this.state.cachedOptions) {
                resolve(this.filterItems(inputValue, this.state.cachedOptions));
            } else {
                // todo: remove !
                this.props.getOptions!().then((choices: Item[]) => {
                    this.setState(prevState => ({ ...prevState, cachedOptions: choices }));
                    resolve(this.filterItems(inputValue, choices));
                });
            }
        })

    renderSelect() {
        const {
            choices = [],
            clearable = true,
            disabled = false,
            error,
            hint,
            label,
            name,
            value
        } = this.props;
        return (
            <div className={`govuk-form-group${error ? ' govuk-form-group--error' : ''}`}>
                <label htmlFor={`${name}-input`} id={`${name}-label`} className="govuk-label govuk-label--s">{label}</label>
                {hint && <span className="govuk-hint">{hint}</span>}
                {error && <span id={`${name}-error`} className="govuk-error-message">{error}</span>}
                <AsyncSelect<Item | string>
                    cacheOptions
                    classNamePrefix="govuk-typeahead"
                    components={{
                        Control: props => (
                            <components.Control
                                className={error ? ' govuk-typeahead__control--error' : undefined}
                                {...props}
                            />
                        )
                    }}
                    defaultOptions
                    error={error}
                    id={name}
                    inputId={`${name}-input`}
                    isDisabled={disabled}
                    isClearable={clearable}
                    loadOptions={this.promiseOptions}
                    noOptionsMessage={() => 'No matches'}
                    onChange={this.handleChange.bind(this)}
                    options={choices}
                    placeholder="Search"
                    styles={{
                        control: () => ({}),
                        indicatorSeparator: () => ({}),
                        dropdownIndicator: () => ({}),
                        menu: () => ({}),
                        menuList: () => ({}),
                        groupHeading: () => ({}),
                        option: () => ({}),
                        valueContainer: () => ({}),
                        placeholder: () => ({})
                    }}
                    value={value}
                />
            </div >
        );
    }

    renderOptions() {
        const {
            choices = [],
            disabled = false,
            error,
            hint,
            label,
            name,
            value
        } = this.props;
        return (
            <div className={`govuk-form-group${error ? ' govuk-form-group--error' : ''}`}>

                <label htmlFor={name} id={`${name}-label`} className="govuk-label govuk-label--s">{label}</label>
                {hint && <span className="govuk-hint">{hint}</span>}
                {error && <span className="govuk-error-message">{error}</span>}

                <select className={`govuk-select ${error ? 'govuk-select--error' : ''}`}
                    id={name}
                    name={name}
                    disabled={disabled}
                    value={value ? typeof value === 'string' ? value : value.value : undefined}
                >
                    {choices && choices.map(({ label, value }, i) => {
                        return (
                            <option key={value} value={value} >{label}</option>
                        );
                    })}
                </select>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.componentMounted ? this.renderSelect() : this.renderOptions()}
            </div>
        );
    }

}

export default TypeAhead;
