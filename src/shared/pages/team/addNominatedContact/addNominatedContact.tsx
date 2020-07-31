import React, { Reducer, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';
import Submit from '../../../common/components/forms/submit';
import Text from '../../../common/components/forms/text';
import { ApplicationConsumer } from '../../../contexts/application';
import { reducer } from './reducer';
import { State } from './state';
import { Action } from './actions';
import Item from '../../../models/item';
import { initialState } from './initialState';
import ErrorSummary from '../../../common/components/errorSummary';
import {
    GENERAL_ERROR_TITLE,
    ADD_NOMINATED_CONTACT_SUCCESS,
    VALIDATION_ERROR_TITLE,
    LOAD_TEAM_ERROR_DESCRIPTION,
    DUPLICATE_NOMINATED_CONTACT_DESCRIPTION,
    ADD_NOMINATED_CONTACT_ERROR_DESCRIPTION,
    EMPTY_SUBMIT_NOMINATED_CONTACT_DESCRIPTION,
    EMPTY_SUBMIT_NOMINATED_CONTACT_TITLE,
    EMAIL_VALIDATION_ERROR_TITLE
} from '../../../models/constants';
import useError from '../../../hooks/useError';
import ErrorMessage from '../../../models/errorMessage';
import { validate } from '../../../validation';
import { addNominatedContact } from '../../../services/nominatedContactsService';
import { getTeam } from '../../../services/teamsService';

interface MatchParams {
    teamId: string;
}

interface AddNominatedContactProps extends RouteComponentProps<MatchParams> {
    csrfToken?: string;

}

const validationSchema = object({
    inputValue: string()
        .required()
        .label('email address')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
});

const AddNominatedContact: React.FC<AddNominatedContactProps> = ({ csrfToken, history, match }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', EMAIL_VALIDATION_ERROR_TITLE);
    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    const { params: { teamId } } = match;

    useEffect(() => {
        getTeam(teamId)
            .then(team => dispatch({ type: 'SetTeam', payload: team }))
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TEAM_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (state.selectedContacts.length === 0) {
            setErrorMessage(new ErrorMessage(EMPTY_SUBMIT_NOMINATED_CONTACT_DESCRIPTION, EMPTY_SUBMIT_NOMINATED_CONTACT_TITLE));
            return;
        }
        Promise.all(state.selectedContacts.map(contact =>
            addNominatedContact({
                emailAddress: contact.value,
                teamUUID: state.teamUUID
            })
                .then(() => dispatch({ type: 'RemoveFromSelection', payload: contact }))
                .catch((error) => {
                    if (error && error.response && error.response.status === 409) {
                        setErrorMessage(new ErrorMessage(DUPLICATE_NOMINATED_CONTACT_DESCRIPTION, VALIDATION_ERROR_TITLE));
                    } else {
                        setErrorMessage(new ErrorMessage(ADD_NOMINATED_CONTACT_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                    }
                    throw error;
                })
        )).then(() => {
            history.push('/', { successMessage: ADD_NOMINATED_CONTACT_SUCCESS });
        }).catch(() => { });

    };

    const onAddContact = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, state, addFormError)) {
            dispatch({ type: 'AddToSelection', payload: state.inputValue });
            dispatch({ type: 'ClearInputField' });
        }
    };

    const onRemoveContact = (contact: Item) => {
        clearErrors();
        dispatch({ type: 'RemoveFromSelection', payload: contact });
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <Link className="govuk-back-link" to={`/team-view/${teamId}`}>Back</Link>
                    <ErrorSummary
                        pageError={pageError}
                    />
                    <h1 className="govuk-heading-xl">
                        Add nominated contact
                    </h1>
                    <h2 className="govuk-heading-l">
                        {`Team: ${state.teamName}`}
                    </h2>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form action="/api/nominated-contact" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <Text
                            label="Email Address"
                            name="emailAddress"
                            type="text"
                            updateState={({ value }) => dispatch({ type: 'UpdateInputValue', payload: (value as string) })}
                            value={state.inputValue}
                        />
                        <button
                            type="submit"
                            className="govuk-button"
                            onClick={onAddContact}
                        >Add nominated contact</button>

                        <div className="govuk-grid-row">
                            <div className="govuk-grid-column-two-thirds-from-desktop">
                                <table className="govuk-table">
                                    <caption className="govuk-table__caption">Nominated contacts to be added:</caption>
                                    {state.selectedContacts.length > 0 && <tbody className="govuk-table__body">
                                        {state.selectedContacts.map(contact => (
                                            <tr key={contact.value} className="govuk-table__row">
                                                <th scope="row" className="govuk-table__header">
                                                    {contact.label}
                                                </th>
                                                <td className="govuk-table__cell">
                                                    <a className="govuk-link" href="#" onClick={() => onRemoveContact(contact)}>
                                                        Remove<span className="govuk-visually-hidden"> contact</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    }
                                    {state.selectedContacts.length === 0 && <tbody className="govuk-table__body">

                                        <tr key="none" className="govuk-table__row">
                                            <td className="govuk-table__cell">
                                                None
                                            </td>
                                        </tr>

                                    </tbody>
                                    }
                                </table>
                            </div>
                        </div>

                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

const WrappedAddNominatedContact = ({ history, location, match }: RouteComponentProps<MatchParams>) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <AddNominatedContact csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddNominatedContact;
