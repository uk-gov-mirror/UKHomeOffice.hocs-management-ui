import React, { Component } from 'react';
import Select, { components } from 'react-select';

interface Item {
    label: string;
    value: string;
}

interface Choice {
    label: string;
    options: Item[];
}
interface TypeAheadProps {
    choices: Choice[];
    clearable: boolean;
    disabled: boolean;
    error?: string;
    hint?: string;
    label: string;
    name: string;
    updateState: ({}) => void;
    value?: string;
}

interface TypeAheadState {
    choices: Choice[];
    componentMounted: boolean;
    value?: string;
}

class TypeAhead extends Component<TypeAheadProps, TypeAheadState> {

    constructor(props: TypeAheadProps) {
        super(props);
        const choices = [...props.choices];
        choices.unshift({ label: '', options: [{ label: '', value: '' }] });
        this.state = {
            choices,
            value: this.props.value,
            componentMounted: false
        };
    }

    componentDidMount() {
        this.setState({ componentMounted: true });
        this.props.updateState({ [this.props.name]: this.state.value });
    }

    handleChange(e: any) {
        const value = e ? e.value : null;
        this.setState({ value });
        this.props.updateState({ [this.props.name]: value });
    }

    getOptions(input: string, callback: (options: Choice[]) => void) {
        let options: Choice[];
        if (input.length > 0) {
            const searchString = input.toLowerCase().trim();
            options = this.state.choices.reduce((reducer: Choice[], group) => {
                reducer.push({
                    label: group.label,
                    options: group.options
                        .filter(item => item.label.toLowerCase().indexOf(searchString) !== -1)
                        .slice(0, 100)
                });
                return reducer;
            }, []);
        } else {
            options = [];
        }
        return callback(options);
    }

    renderSelect() {
        const {
            clearable = true,
            disabled,
            error,
            hint,
            label,
            name
        } = this.props;
        const { choices } = this.state;
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
                    classNamePrefix="govuk-typeahead"
                    options={choices}
                    isDisabled={disabled}
                    isClearable={clearable}
                    error={error}
                    onChange={this.handleChange.bind(this)}
                    loadOptions={this.getOptions.bind(this)}
                />
            </div >
        );
    }

    renderOptions() {
        const {
            disabled,
            error,
            hint,
            label,
            name
        } = this.props;
        const { choices } = this.state;
        return (
            <div className={`govuk-form-group${error ? ' govuk-form-group--error' : ''}`}>

                <label htmlFor={name} id={`${name}-label`} className="govuk-label govuk-label--s">{label}</label>
                {hint && <span className="govuk-hint">{hint}</span>}
                {error && <span className="govuk-error-message">{error}</span>}

                <select className={`govuk-select ${error ? 'govuk-select--error' : ''}`}
                    id={name}
                    name={name}
                    disabled={disabled}
                    value={this.state.value}
                >
                    {choices && choices.map((group, i) => {
                        return (
                            <optgroup key={i} label={group.label} >
                                {group.options && group.options.map((choice, j) => {
                                    return (
                                        <option key={j} value={choice.value} >{choice.label}</option>
                                    );
                                })}
                            </optgroup>
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
