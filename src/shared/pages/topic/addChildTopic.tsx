import React, { Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import Submit from '../../common/components/forms/submit';
import { ApplicationConsumer } from '../../contexts/application';
import { getUsers } from '../../services/usersService';
import { reducer } from './reducer';
import { State } from './state';
import { Action } from './actions';
import { initialState } from './initialState';
import ApiStatus from '../../models/apiStatus';
import { ContextAction, updateApiStatus } from '../../contexts/actions';
import status from '../../helpers/api-status.js';
import Item from '../../models/item';

interface AddUnitProps extends RouteComponentProps {
    apiStatus?: ApiStatus;
    csrfToken?: string;
    contextDispatch: (action: ContextAction<any>) => Promise<any>;
}

const onBackLinkClick = (history: History) => {
    history.push('/');
};

const AddUnit: React.FC<AddUnitProps> = ({ apiStatus, csrfToken, contextDispatch, history }) => {

    // const [validationErrors, setValidationErrors] = React.useState<FormError[]>();

    const [, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    React.useEffect(() => {
        contextDispatch(updateApiStatus(status.REQUEST_PARENT_TOPICS));
        getUsers()
            .then((users: Item[]) => {
                dispatch({ type: 'SetParentTopics', payload: users });
                contextDispatch(updateApiStatus(status.REQUEST_PARENT_TOPICS_SUCCESS));
            })
            .catch(() => {
                contextDispatch(updateApiStatus(status.REQUEST_PARENT_TOPICS_FAILURE));
            });
    }, []);

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>

                    <h1 className="govuk-heading-xl">
                        Add Unit
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form action="/api/units" method="POST" onSubmit={() => { }}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
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
