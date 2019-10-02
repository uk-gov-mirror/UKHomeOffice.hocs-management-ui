import React, { Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import Submit from '../../common/components/forms/submit';
import { ApplicationConsumer } from '../../contexts/application';
import { getParentTopics } from '../../services/topicsService';
import { reducer } from './reducer';
import { State } from './state';
import { Action } from './actions';
import { initialState } from './initialState';
import ApiStatus from '../../models/apiStatus';
import { ContextAction, updateApiStatus } from '../../contexts/actions';
import status from '../../helpers/api-status.js';
import Item from '../../models/item';
import useError from '../../hooks/useError';
import { GENERAL_ERROR_TITLE, LOAD_PARENT_TOPICS_ERROR_DESCRIPTION } from '../../models/constants';
import ErrorSummary from '../../common/components/errorSummary';
import ErrorMessage from '../../models/errorMessage';
import TypeAhead from '../../common/components/typeAhead';
import Text from '../../common/components/forms/text';

interface AddUnitProps extends RouteComponentProps {
    apiStatus?: ApiStatus;
    csrfToken?: string;
    contextDispatch: (action: ContextAction<any>) => Promise<any>;
}

const onBackLinkClick = (history: History) => {
    history.push('/');
};

const AddUnit: React.FC<AddUnitProps> = ({ apiStatus, csrfToken, contextDispatch, history }) => {

    const [pageError, , , setErrorMessage] = useError();

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

    const onSelectedParentTopicChange = React.useCallback((selectedParentTopic: Item) => {
        dispatch({ type: 'SetSelectedParentTopic', payload: selectedParentTopic });
    }, []);

    const onDisplayNameChange = React.useCallback(({ value }) => dispatch({ type: 'SetDisplayName', payload: value }), []);

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
                    <form action="/api/units" method="POST" onSubmit={() => { }}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <TypeAhead
                            choices={state.parentTopics}
                            clearable={true}
                            disabled={false}
                            label={'Select The Parent Topic'}
                            name={'ParentTopics'}
                            onSelectedItemChange={onSelectedParentTopicChange}
                            value={state.selectedParentTopic}
                        ></TypeAhead>
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

const WrappedAddUnit = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf, dispatch, apiStatus }) => (
            <AddUnit apiStatus={apiStatus} csrfToken={csrf} contextDispatch={dispatch} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddUnit;
