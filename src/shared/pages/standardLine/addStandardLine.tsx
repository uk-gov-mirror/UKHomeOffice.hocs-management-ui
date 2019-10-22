import React, { Reducer, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { object, string, date, array } from 'yup';
import Submit from '../../common/components/forms/submit';
import { ApplicationConsumer } from '../../contexts/application';
import { addStandardLine } from '../../services/standardLinesService';
import { reducer } from './reducer';
import ErrorSummary from '../../common/components/errorSummary';
import useError from '../../hooks/useError';
import * as constants from '../../models/constants';
import ErrorMessage from '../../models/errorMessage';
import InputEventData from '../../models/inputEventData';
import { validate } from '../../validation';
import StandardLine from '../../models/standardLine';
import DateInput from '../../common/components/forms/date';
import DocumentAdd from '../../common/components/forms/documentAdd';
import TypeAhead from '../../common/components/typeAhead';
import Item from '../../models/item';
import { getTopics } from '../../services/topicsService';

interface AddStandardLineProps extends RouteComponentProps {
    csrfToken?: string;
}

const validationSchema = object({
    files: array()
        .max(1)
        .min(1)
        .required()
        .label('Standard Line'),
    expiryDate: date()
        .required()
        .label('Expiry Date'),
    topic: string()
        .required()
        .label('Topic')
});

const AddStandardLine: React.FC<AddStandardLineProps> = ({ csrfToken, history }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', constants.VALIDATION_ERROR_TITLE);

    const [standardLine, dispatch] = React.useReducer<Reducer<StandardLine, InputEventData>>(reducer, {
        expiryDate: '',
        topic: ''
    });

    const getTopicsForTypeahead = useCallback(() => new Promise<Item[]>((resolve) => {
        getTopics()
            .then((topics: Item[]) => {
                resolve(topics);
            })
            .catch(() => {
                setErrorMessage(new ErrorMessage(constants.LOAD_TOPICS_ERROR_DESCRIPTION, constants.GENERAL_ERROR_TITLE));
                resolve([]);
            });
    }), []);

    const onSelectedTopicChange = useCallback((selectedTopic: Item) => {
        dispatch({ name: 'topic', value: selectedTopic.value });
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, standardLine, addFormError)) {
            const data = new FormData();
            data.append('file', standardLine.files![0]);
            data.append('topic', standardLine.topic);
            data.append('expiryDate', standardLine.expiryDate);

            addStandardLine(data).then(() => {
                history.push('/');
            }).catch((error: any) => {
                setErrorMessage(new ErrorMessage(constants.ADD_STANDARD_LINE_ERROR_DESCRIPTION, constants.GENERAL_ERROR_TITLE));
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
                        <TypeAhead
                            clearable={true}
                            disabled={false}
                            getOptions={getTopicsForTypeahead}
                            label={'Topics'}
                            name={'topics'}
                            onSelectedItemChange={onSelectedTopicChange}
                        />
                        <DocumentAdd
                            name="files"
                            updateState={dispatch}
                        />
                        <DateInput
                            label="Expiry Date"
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

const WrappedAddStandardLine = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <AddStandardLine csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddStandardLine;
