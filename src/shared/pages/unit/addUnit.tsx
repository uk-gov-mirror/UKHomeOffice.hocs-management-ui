import React, { Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import Submit from '../../common/components/forms/submit';
import Text from '../../common/components/forms/text';
import { ApplicationConsumer } from '../../contexts/application';
import { createUnit } from '../../services/unitsService';
import { reducer } from './reducer';
import { State } from './state';
import { Action } from './actions';
import { initialState } from './initialState';
import ErrorSummary from '../../common/components/errorSummary';
import { GENERAL_ERROR_TITLE, ADD_UNIT_ERROR_DESCRIPTION } from '../../models/constants';

interface AddUnitProps extends RouteComponentProps {
    csrfToken?: string;
}

const validate = (state: State, dispatch: (value: Action) => void) => {
    // todo: validation framework
    let valid = true;

    if (state.unit.displayName === '') {
        dispatch({
            type: 'AddValidationError',
            payload: { key: 'displayName', value: 'Display name is required' }
        });
        valid = false;
    }
    if (state.unit.shortCode === '') {
        dispatch({
            type: 'AddValidationError',
            payload: { key: 'shortCode', value: 'Short code is required' }
        });
        valid = false;
    }
    return valid;
};

const onBackLinkClick = (history: History) => {
    history.push('/');
};

const AddUnit: React.FC<AddUnitProps> = ({ csrfToken, history }) => {

    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch({ type: 'BeginSubmit' });
        if (validate(state, dispatch)) {
            createUnit(state.unit).then(() => {
                history.push('/');
            }).catch(() => {
                dispatch({ type: 'SetGeneralError', payload: { title: GENERAL_ERROR_TITLE, description: ADD_UNIT_ERROR_DESCRIPTION } });
            });
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
                    <ErrorSummary
                        heading={state.errorTitle}
                        description={state.errorDescription}
                        errors={state.errors}
                    />
                    <h1 className="govuk-heading-xl">
                        Add Unit
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form action="/api/units" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <Text
                            label="Display Name"
                            name="displayName"
                            type="text"
                            updateState={({ name, value }) => dispatch({ type: 'SetUnitValues', payload: { name, value } })}
                            value={state.unit.displayName}
                        />
                        <Text
                            label="Short Code"
                            name="shortCode"
                            type="text"
                            updateState={({ name, value }) => dispatch({ type: 'SetUnitValues', payload: { name, value } })}
                            value={state.unit.shortCode}
                        />
                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

const WrappedAddUnit = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <AddUnit csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddUnit;
