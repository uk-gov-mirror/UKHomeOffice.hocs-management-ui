import React, { Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';
import Submit from '../../common/components/forms/submit';
import { ApplicationConsumer } from '../../contexts/application';
import { addStandardLine } from '../../services/standardLinesService';
import { reducer } from './reducer';
import ErrorSummary from '../../common/components/errorSummary';
import useError from '../../hooks/useError';
import { GENERAL_ERROR_TITLE, ADD_UNIT_ERROR_DESCRIPTION, VALIDATION_ERROR_TITLE, DUPLICATE_UNIT_DESCRIPTION } from '../../models/constants';
import ErrorMessage from '../../models/errorMessage';
import InputEventData from '../../models/inputEventData';
import { validate } from '../../validation';
import StandardLine from '../../models/standardLine';
import DateInput from '../../common/components/forms/date';
import DocumentAdd from '../../common/components/forms/documentAdd';

interface AddStandardLineProps extends RouteComponentProps {
    csrfToken?: string;
}

const validationSchema = object({
    expiryDate: string()
        .required()
        .label('Expiry Date')
        .matches(/^[a-zA-Z0-9_,.!? ()&]*$/),
    topic: string()
        .required()
        .label('Topic')
        .matches(/^[a-zA-Z0-9_,.!? ()&]*$/)
});

const AddStandardLine: React.FC<AddStandardLineProps> = ({ csrfToken, history }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', VALIDATION_ERROR_TITLE);

    const [standardLine, dispatch] = React.useReducer<Reducer<StandardLine, InputEventData>>(reducer, {
        expiryDate: '',
        topic: ''
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, standardLine, addFormError)) {
            addStandardLine(standardLine).then(() => {
                history.push('/');
            }).catch((error) => {
                if (error && error.response && error.response.status === 409) {
                    setErrorMessage(new ErrorMessage(DUPLICATE_UNIT_DESCRIPTION, VALIDATION_ERROR_TITLE));
                } else {
                    setErrorMessage(new ErrorMessage(ADD_UNIT_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                }
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
                        Add a Standard Line
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form action="/api/standardLines" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <DocumentAdd
                            name="files"
                            updateState={dispatch}
                        />
                        <DateInput
                            name="expiryDate"
                            label="Expiry Date"
                            updateState={dispatch}
                        />
                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

const WrappedAddStandardLine = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <AddStandardLine csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddStandardLine;
