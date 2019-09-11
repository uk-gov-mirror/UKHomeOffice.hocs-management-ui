import React, { useEffect, useCallback, Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { getTeam } from '../../services/teamsService';
import { addUserToTeam, getUsers, AddUserError } from '../../services/usersService';
import TypeAhead from '../../common/components/type-ahead';
import ErrorSummary, { FormError } from '../../common/components/errorSummary';
import Item from '../../models/item';
import { User } from '../../models/user';
import {History} from "history";

interface UserResponse {
    data: User[];
}

interface MatchParams {
    teamId: string;
}

export interface AddToTeamProps extends RouteComponentProps<MatchParams> { }

type Action =
    { payload: FormError, type: 'AddError' } |
    { type: 'BeginSubmit' } |
    { payload: Item, type: 'AddToSelection' } |
    { payload: Item, type: 'RemoveFromSelection' } |
    { payload: Item[], type: 'PopulateUsers' } |
    { payload: Item | undefined, type: 'ClearSelectedUser' } |
    { type: 'SetEmptySumbitError' } |
    { type: 'SetTeamName', payload: string };

type State = {
    errors?: FormError[];
    errorDescription: string;
    errorTitle: string;
    inputValue: string;
    selectedUser?: Item | string;
    selectedUsers: Item[];
    teamName?: string;
    users: Item[];
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'AddError':
            return {
                ...state,
                errorDescription: 'Something went wrong while adding the following users. Please try again.',
                errorTitle: 'There was an error adding the users',
                errors: [...state.errors || [], action.payload]
            };
        case 'BeginSubmit':
            return { ...state, errors: undefined };
        case 'AddToSelection':
            return { ...state, errors: undefined, selectedUsers: [...[], ...state.selectedUsers, action.payload] };
        case 'RemoveFromSelection':
            return { ...state, selectedUsers: [...state.selectedUsers.filter(user => user.value !== action.payload.value)] };
        case 'ClearSelectedUser':
            return { ...state, selectedUser: '' };
        case 'PopulateUsers':
            return { ...state, users: action.payload };
        case 'SetEmptySumbitError':
            return { ...state, errorDescription: 'Please select some users before submitting.', errorTitle: 'No users selected', errors: [] };
        case 'SetTeamName':
            return { ...state, teamName: action.payload };
    }
    return state;
};

const AddToTeam: React.FC<AddToTeamProps> = ({ history, match }) => {

    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, {
        errorDescription: '',
        errorTitle: '',
        inputValue: '',
        errors: undefined,
        selectedUser: undefined,
        selectedUsers: [],
        users: []
    });

    const { params: { teamId } } = match;

    const onBackLinkClick = (history: History) => {
        history.push(`/team_view/${teamId}`)
    };

    const onSubmit = () => {
        if (state.selectedUsers.length === 0) {
            dispatch({ type: 'SetEmptySumbitError' });
            return;
        }

        dispatch({ type: 'BeginSubmit' });
        Promise.all(state.selectedUsers.map(user =>
            addUserToTeam(user, teamId)
                .then(() => dispatch({ type: 'RemoveFromSelection', payload: user }))
                .catch((error: AddUserError) => {
                    const { userToAdd: { label, value } } = error;
                    dispatch({ type: 'AddError', payload: { key: value, value: label } });
                    throw error;
                })
        )).then(() => {
            history.push(`/team_view/${teamId}`);
        });
    };

    const onSelectedUserChange = useCallback((selectedUser: Item) => {
        dispatch({ type: 'AddToSelection', payload: selectedUser });
        dispatch({ type: 'ClearSelectedUser', payload: undefined });
    }, []);

    useEffect(() => {
        getTeam(teamId)
            .then(team => dispatch({ type: 'SetTeamName', payload: team.displayName }));
        getUsers()
            .then((res: UserResponse) => dispatch({ type: 'PopulateUsers', payload: res.data }));
    }, []);

    return (state.teamName ?
        <>
            <div className="govuk-form-group">
                <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
                <ErrorSummary
                    heading={state.errorTitle}
                    description={state.errorDescription}
                    errors={state.errors}
                />
                <h1 className="govuk-heading-xl">
                    Add users
                </h1>
                <h2 className="govuk-heading-l">
                    {`Team: ${state.teamName}`}
                </h2>
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-one-half-from-desktop">
                        <TypeAhead
                            choices={state.users.filter(user => !state.selectedUsers.some(selectedUser => selectedUser.value === user.value))}
                            clearable={true}
                            disabled={false}
                            label={'Select Users'}
                            name={'Users'}
                            onSelectedItemChange={onSelectedUserChange}
                            value={state.selectedUser}
                        ></TypeAhead>
                    </div>
                </div>
            </div>
            {state.selectedUsers.length > 0 &&
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-two-thirds-from-desktop">
                        <table className="govuk-table">
                            <caption className="govuk-table__caption">Users to be added</caption>
                            <tbody className="govuk-table__body">
                                {state.selectedUsers.map(user => (
                                    <tr key={user.value} className="govuk-table__row">
                                        <th scope="row" className="govuk-table__header">
                                            {user.label}
                                        </th>
                                        <td className="govuk-table__cell">
                                            <a className="govuk-link" href="#" onClick={() => dispatch({ type: 'RemoveFromSelection', payload: user })}>
                                                Remove<span className="govuk-visually-hidden"> user</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            <button
                type="submit"
                className="govuk-button view-team-button"
                onClick={onSubmit}
            >
                Add selected users
            </button>
        </> :
        null
    );
};

export default AddToTeam;
