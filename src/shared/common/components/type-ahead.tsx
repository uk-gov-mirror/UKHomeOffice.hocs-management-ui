import React, { Component } from 'react';
import Select, { components } from 'react-select';
import { ActionMeta } from 'react-select/src/types';
import Item from '../../models/item';

interface TypeAheadProps {
    choices: Item[];
    clearable: boolean;
    disabled: boolean;
    error?: string;
    hint?: string;
    label: string;
    name: string;
    onSelectedItemChange: (newItem: Item) => void;
    value?: Item;
}

interface TypeAheadState {
    componentMounted: boolean;
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
        if (input.length > 0) {
            const searchString = input.toLowerCase().trim();
            options = this.props.choices
                .filter(item => item.label.toLowerCase().indexOf(searchString) !== -1)
                .slice(0, 100);
        } else {
            options = [];
        }

        return callback(options);
    }

    renderSelect() {
        const {
            choices,
            clearable = true,
            disabled,
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
                {error && <span id={`${name}-error`} className="govuk-error-message">{error}</span>}
                <Select
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
                    components={{
                        Control: props => (
                            <components.Control
                                className={error ? ' govuk-typeahead__control--error' : undefined}
                                {...props}
                            />
                        )
                    }}
                    id={name}
                    placeholder="Search"
                    options={choices}
                    classNamePrefix="govuk-typeahead"
                    isDisabled={disabled}
                    isClearable={clearable}
                    error={error}
                    onChange={this.handleChange.bind(this)}
                    loadOptions={this.getOptions.bind(this)}
                    value={value}
                />
            </div >
        );
    }

    renderOptions() {
        const {
            choices,
            disabled,
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
                    value={value ? value.value : undefined}
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
