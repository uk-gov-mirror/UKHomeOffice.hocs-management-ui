import React, { Reducer, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { object, date } from 'yup';
import Submit from '../../common/components/forms/submit';
import Text from '../../common/components/forms/text';
import TextArea from '../../common/components/forms/text-area';
import { ApplicationConsumer } from '../../contexts/application';
import { updateStandardLine, getStandardLine } from '../../services/standardLinesService';
import { reducer } from './reducer';
import ErrorSummary from '../../common/components/errorSummary';
import useError from '../../hooks/useError';
import * as constants from '../../models/constants';
import ErrorMessage from '../../models/errorMessage';
import InputEventData from '../../models/inputEventData';
import { validate } from '../../validation';
import DateInput from '../../common/components/forms/date';
import State from './state';
import StandardLineModel from 'shared/models/standardLineModel';

interface MatchParams {
    standardLineUUID: string;
}
interface AmendStandardLineProps extends RouteComponentProps<MatchParams> {
    csrfToken?: string;
}

const validationSchema = object({
    expiryDate: date()
        .required()
        .min(new Date(), 'The Expiry Date must be in the future')
        .label('New Expiry Date')
});

const AmendStandardLine: React.FC<AmendStandardLineProps> = ({ csrfToken, history, match }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', constants.VALIDATION_ERROR_TITLE);

    const { params: { standardLineUUID } } = match;
    const initialState: State = {
        expiryDate: '',
        oldExpiryDate: '',
        displayName: '',
        topic: ''
    };

    useEffect(() => {
        getStandardLine(standardLineUUID)
            .then((standardLine: StandardLineModel) => {
                dispatch({ name: 'displayName', value: standardLine.displayName });
                dispatch({ name: 'oldExpiryDate', value: standardLine.expiryDate });
                dispatch({ name: 'topic', value: standardLine.topic });
            })
            .catch(() => {
                setErrorMessage(new ErrorMessage(constants.LOAD_STANDARD_LINE_ERROR_DESCRIPTION, constants.GENERAL_ERROR_TITLE));
            });
    }, []);

    const [state, dispatch] = React.useReducer<Reducer<State, InputEventData>>(reducer, initialState);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, state, addFormError)) {
            updateStandardLine({ uuid: standardLineUUID, expiryDate: state.expiryDate }).then(() => {
                history.push('/manage-standard-lines', { successMessage: constants.AMEND_STANDARD_LINE_SUCCESS });
            }).catch((error: any) => {
                setErrorMessage(new ErrorMessage(constants.AMEND_STANDARD_LINE_ERROR_DESCRIPTION, constants.GENERAL_ERROR_TITLE));
            });
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <Link to="/manage-standard-lines" className="govuk-back-link">Back</Link>
                    <ErrorSummary pageError={pageError} />
                    <h1 className="govuk-heading-xl">
                        Amend Standard Line
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form action="/api/standardLines" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <TextArea
                            label="Topic"
                            name="topic"
                            type="text"
                            disabled={true}
                            updateState={dispatch}
                            value={state.topic}
                        />
                        <Text
                            label="Filename"
                            name="displayName"
                            type="text"
                            disabled={true}
                            updateState={dispatch}
                            value={state.displayName}
                        />
                        <Text
                            label="Current Expiry Date"
                            name="oldExpiryDate"
                            type="text"
                            disabled={true}
                            updateState={dispatch}
                            value={state.oldExpiryDate}
                        />
                        <DateInput
                            label="New Expiry Date"
                            name="expiryDate"
                            updateState={dispatch}
                        />
                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

const WrappedAmendStandardLine = ({ history, location, match }: RouteComponentProps<MatchParams>) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <AmendStandardLine csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAmendStandardLine;
