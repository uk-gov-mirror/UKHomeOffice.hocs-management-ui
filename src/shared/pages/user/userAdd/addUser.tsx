import React, { Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';
import Submit from '../../../common/components/forms/submit';
import { ApplicationConsumer } from '../../../contexts/application';
import ErrorSummary from '../../../common/components/errorSummary';
import useError from '../../../hooks/useError';
import * as constants from '../../../models/constants';
import ErrorMessage from '../../../models/errorMessage';
import InputEventData from '../../../models/inputEventData';
import { validate } from '../../../validation';
import { reducer } from './reducer';
import Text from '../../../common/components/forms/text';
import { addUser } from '../../../services/usersService';
import State from './state';

interface AddUserProps extends RouteComponentProps {
    csrfToken?: string;
}

const validationSchema = object({
    email: string()
        .required()
        .max(100)
        .email()
        .label('Email Address'),
    firstName: string()
        .required()
        .label('First Name')
        .max(50),
    lastName: string()
        .required()
        .label('Last Name')
        .max(50)
});

const AddUser: React.FC<AddUserProps> = ({ csrfToken, history }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', constants.VALIDATION_ERROR_TITLE);

    const [user, dispatch] = React.useReducer<Reducer<State, InputEventData>>(reducer, {
        email: '',
        firstName: '',
        lastName: ''
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, user, addFormError)) {
            const data = new FormData();
            data.append('email', user.email);
            data.append('firstName', user.firstName);
            data.append('lastName', user.lastName);

            addUser(data).then((userUUID: string) => {
                history.push(`/user-view/${userUUID}`, { successMessage: constants.ADD_USER_SUCCESS });
            }).catch((error: any) => {
                let errorMessage;
                if (error.response.status >= 400 && error.response.status <= 499) {
                    errorMessage = new ErrorMessage(error.response.data.message, constants.ADD_USER_BAD_REQUEST_TITLE);
                } else {
                    errorMessage = new ErrorMessage(constants.ADD_USER_ERROR_DESCRIPTION, constants.ADD_USER_ERROR_TITLE);
                }
                setErrorMessage(errorMessage);
            });
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <Link to="/" className="govuk-back-link">Back</Link>
                    <ErrorSummary pageError={pageError} />
                    <h1 className="govuk-heading-xl">
                        Add a User
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form action="/api/user" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <Text
                            label="Email Address"
                            name="email"
                            type="text"
                            updateState={({ name, value }) => dispatch({ name, value })}
                            value={user.email}
                        />
                        <Text
                            label="First Name"
                            name="firstName"
                            type="text"
                            updateState={({ name, value }) => dispatch({ name, value })}
                            value={user.firstName}
                        />
                        <Text
                            label="Last Name"
                            name="lastName"
                            type="text"
                            updateState={({ name, value }) => dispatch({ name, value })}
                            value={user.lastName}
                        />
                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

const WrappedAddUser = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <AddUser csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddUser;
