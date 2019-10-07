import React, { Reducer, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { string, object } from 'yup';
import Submit from '../../common/components/forms/submit';
import { ApplicationConsumer } from '../../contexts/application';
import { addChildTopic, getParentTopics } from '../../services/topicsService';
import { reducer } from './reducer';
import { State } from './state';
import { Action } from './actions';
import { initialState } from './initialState';
import { ContextAction, updateApiStatus } from '../../contexts/actions';
import status from '../../helpers/api-status.js';
import Item from '../../models/item';
import useError from '../../hooks/useError';
import { GENERAL_ERROR_TITLE, LOAD_PARENT_TOPICS_ERROR_DESCRIPTION, VALIDATION_ERROR_TITLE, DUPLICATE_CHILD_TOPIC_DESCRIPTION, ADD_CHILD_TOPIC_ERROR_DESCRIPTION } from '../../models/constants';
import ErrorSummary from '../../common/components/errorSummary';
import ErrorMessage from '../../models/errorMessage';
import TypeAhead from '../../common/components/typeAhead';
import Text from '../../common/components/forms/text';
import { validate } from '../../validation';

interface AddChildTopicProps extends RouteComponentProps {
    csrfToken?: string;
    contextDispatch: (action: ContextAction<any>) => Promise<any>;
}

const validationSchema = object({
    displayName: string()
        .required()
        .label('Display Name')
        .matches(/^[a-zA-Z0-9_,.!? ()&]*$/),
    selectedParentTopic: object({
        label: string().required()
            .label('Parent Topic')
    })
});

const onBackLinkClick = (history: History) => {
    history.push('/');
};

const AddChildTopic: React.FC<AddChildTopicProps> = ({ csrfToken, contextDispatch, history }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', VALIDATION_ERROR_TITLE);

    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    React.useEffect(() => {
        contextDispatch(updateApiStatus(status.REQUEST_PARENT_TOPICS));
        getParentTopics()
            .then((parentTopics: Item[]) => {
                dispatch({ type: 'SetParentTopics', payload: parentTopics });
                contextDispatch(updateApiStatus(status.REQUEST_PARENT_TOPICS_SUCCESS));
            })
            .catch(() => {
                contextDispatch(updateApiStatus(status.REQUEST_PARENT_TOPICS_FAILURE));
                setErrorMessage(new ErrorMessage(LOAD_PARENT_TOPICS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
    }, []);

    const onSelectedParentTopicChange = useCallback((selectedParentTopic: Item) => {
        dispatch({ type: 'SetSelectedParentTopic', payload: selectedParentTopic });
    }, []);

    const onDisplayNameChange = useCallback(({ value }) => dispatch({ type: 'SetDisplayName', payload: value }), []);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(state);
        clearErrors();
        if (validate(validationSchema, state, addFormError)) {
            addChildTopic(state.selectedParentTopic!.value, state.displayName)
                .then(() => history.push('/'))
                .catch((error) => {
                    if (error && error.response && error.response.status === 409) {
                        setErrorMessage(new ErrorMessage(DUPLICATE_CHILD_TOPIC_DESCRIPTION, VALIDATION_ERROR_TITLE));
                    } else {
                        setErrorMessage(new ErrorMessage(ADD_CHILD_TOPIC_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                    }
                });
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
                    <ErrorSummary
                        pageError={pageError}
                    />
                    <h1 className="govuk-heading-xl">
                        Add Child Topic
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form method="POST" onSubmit={onSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <TypeAhead
                            choices={state.parentTopics}
                            clearable={true}
                            disabled={false}
                            label={'Select The Parent Topic'}
                            name={'parent-topics'}
                            onSelectedItemChange={onSelectedParentTopicChange}
                            value={state.selectedParentTopic}
                        />
                        <Text
                            label="Display Name"
                            name="displayName"
                            type="text"
                            updateState={onDisplayNameChange}
                            value={state.displayName}
                        />
                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

const WrappedAddChildTopic = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf, dispatch }) => (
            <AddChildTopic csrfToken={csrf} contextDispatch={dispatch} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddChildTopic;
