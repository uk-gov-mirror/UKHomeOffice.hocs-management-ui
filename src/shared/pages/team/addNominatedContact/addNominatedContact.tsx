import React, { Reducer, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';
import Submit from '../../../common/components/forms/submit';
import Text from '../../../common/components/forms/text';
import { ApplicationConsumer } from '../../../contexts/application';
import { reducer } from './reducer';
import ErrorSummary from '../../../common/components/errorSummary';
import {
    GENERAL_ERROR_TITLE,
    ADD_NOMINATED_CONTACT_SUCCESS,
    VALIDATION_ERROR_TITLE,
    LOAD_TEAM_ERROR_DESCRIPTION,
    DUPLICATE_NOMINATED_CONTACT_DESCRIPTION,
    ADD_NOMINATED_CONTACT_ERROR_DESCRIPTION
} from '../../../models/constants';
import useError from '../../../hooks/useError';
import ErrorMessage from '../../../models/errorMessage';
import NominatedContact from '../../../models/nominatedContact';
import { validate } from '../../../validation';
import InputEventData from '../../../models/inputEventData';
import { addNominatedContact } from '../../../services/nominatedContactsService';
import { getTeam } from '../../../services/teamsService';

interface MatchParams {
    teamId: string;
}

interface AddNominatedContactProps extends RouteComponentProps<MatchParams> {
    csrfToken?: string;

}

const validationSchema = object({
    emailAddress: string()
        .required()
        .label('email address')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
});

const AddNominatedContact: React.FC<AddNominatedContactProps> = ({ csrfToken, history, match }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', VALIDATION_ERROR_TITLE);
    const [nominatedContact, dispatch] = React.useReducer<Reducer<NominatedContact, InputEventData>>(reducer, {
        emailAddress: '',
        teamName: '',
        teamUUID: ''
    });

    const { params: { teamId } } = match;

    useEffect(() => {
        getTeam(teamId)
            .then((team) => {
                nominatedContact.teamName = team.displayName;
                nominatedContact.teamUUID = team.type;
            })
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TEAM_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, nominatedContact, addFormError)) {
            addNominatedContact(nominatedContact).then(() => {
                history.push('/', { successMessage: ADD_NOMINATED_CONTACT_SUCCESS });
            }).catch((error) => {
                if (error && error.response && error.response.status === 409) {
                    setErrorMessage(new ErrorMessage(DUPLICATE_NOMINATED_CONTACT_DESCRIPTION, VALIDATION_ERROR_TITLE));
                } else {
                    setErrorMessage(new ErrorMessage(ADD_NOMINATED_CONTACT_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                }
            });
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <Link to="/" className="govuk-back-link">Back</Link>
                    <ErrorSummary
                        pageError={pageError}
                    />
                    <h1 className="govuk-heading-xl">
                        Add nominated contact
                    </h1>
                    <h2 className="govuk-heading-l">
                        {`Team: ${nominatedContact.teamName}`}
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
                            updateState={({ name, value }) => dispatch({ name, value })}
                            value={nominatedContact.emailAddress}
                        />
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
            <AddNominatedContact csrfToken={csrf} history={history} location={location} match={match}/>
        )}
    </ApplicationConsumer>
);

export default WrappedAddNominatedContact;
