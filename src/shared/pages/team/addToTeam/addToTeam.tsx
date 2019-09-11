import React, { useEffect, useCallback, Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { getTeam } from '../../../services/teamsService';
import { addUserToTeam, getUsers, AddUserError } from '../../../services/usersService';
import TypeAhead from '../../../common/components/type-ahead';
import ErrorSummary from '../../../common/components/errorSummary';
import Item from '../../../models/item';
import { User } from '../../../models/user';
import { reducer } from './reducer';
import { Action } from './action';
import { State } from './state';

interface UserResponse {
    data: User[];
}

interface MatchParams {
    teamId: string;
}

export interface AddToTeamProps extends RouteComponentProps<MatchParams> { }

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
        history.push(`/team_view/${teamId}`);
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
