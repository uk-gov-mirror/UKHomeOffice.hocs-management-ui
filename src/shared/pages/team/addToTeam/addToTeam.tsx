import React, { useEffect, useCallback, Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { getTeam } from '../../../services/teamsService';
import { addUserToTeam, getUsers, AddUserError } from '../../../services/usersService';
import TypeAhead from '../../../common/components/typeAhead';
import ErrorSummary from '../../../common/components/errorSummary';
import Item from '../../../models/item';
import { User } from '../../../models/user';
import { reducer } from './reducer';
import { Action } from './actions';
import { State } from './state';
import { initialState } from './initialState';
import { EMPTY_SUBMIT_ERROR_DESCRIPTION, EMPTY_SUBMIT_ERROR_TITLE, GENERAL_ERROR_TITLE, LOAD_TEAM_ERROR_DESCRIPTION, LOAD_USERS_ERROR_DESCRIPTION, ADD_USER_ERROR_TITLE, ADD_USER_ERROR_DESCRIPTION } from '../../../models/constants';
import useError from '../../../hooks/useError';
import ErrorMessage from '../../../models/errorMessage';

interface MatchParams {
    teamId: string;
}

export interface AddToTeamProps extends RouteComponentProps<MatchParams> { }

const AddToTeam: React.FC<AddToTeamProps> = ({ history, match }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError(ADD_USER_ERROR_DESCRIPTION, ADD_USER_ERROR_TITLE);
    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    const { params: { teamId } } = match;

    const onBackLinkClick = (history: History) => {
        history.push(`/team_view/${teamId}`);
    };

    const onSubmit = () => {
        clearErrors();
        if (state.selectedUsers.length === 0) {
            setErrorMessage(new ErrorMessage(EMPTY_SUBMIT_ERROR_DESCRIPTION, EMPTY_SUBMIT_ERROR_TITLE));
            return;
        }

        Promise.all(state.selectedUsers.map(user =>
            addUserToTeam(user, teamId)
                .then(() => dispatch({ type: 'RemoveFromSelection', payload: user }))
                .catch((error: AddUserError) => {
                    const { userToAdd: { label, value } } = error;
                    addFormError({ key: value, value: label });
                    throw error;
                })
        )).then(() => {
            history.push(`/team-view/${teamId}`);
        }).catch(() => { });
    };

    const onSelectedUserChange = useCallback((selectedUser: Item) => {
        clearErrors();
        dispatch({ type: 'AddToSelection', payload: selectedUser });
        dispatch({ type: 'ClearSelectedUser' });
    }, []);

    useEffect(() => {
        getTeam(teamId)
            .then(team => dispatch({ type: 'SetTeamName', payload: team.displayName }))
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TEAM_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
        getUsers()
            .then((users: User[]) => dispatch({ type: 'PopulateUsers', payload: users }))
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_USERS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
    }, []);

    return (
        <>
            <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
            <ErrorSummary
                pageError={pageError}
            />
            {state.teamName &&
                <div className="govuk-form-group">
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
            }
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
        </>
    );
};

export default AddToTeam;
