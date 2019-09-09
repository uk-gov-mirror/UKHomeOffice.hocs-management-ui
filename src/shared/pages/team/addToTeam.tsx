import React, { useEffect, useCallback, useReducer, Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { addUserToTeam, getUsers, AddUserError } from '../../services/usersService';
import TypeAhead from '../../common/components/type-ahead';
import ErrorSummary, { FormError } from '../../common/components/errorSummary';
import Item from '../../models/item';

interface UserResponse {
    data: User[];
}

interface User {
    label: string;
    value: string;
}

interface MatchParams {
    teamId: string;
}

interface UserSearchProps extends RouteComponentProps<MatchParams>{
    history: History;
}

type Action =
    { payload: FormError, type: 'AddError' } |
    { type: 'BeginSubmit' } |
    { payload: Item, type: 'AddToSelection' } |
    { payload: Item, type: 'RemoveFromSelection' } |
    { payload: Item[], type: 'PopulateUsers' } |
    { payload: Item | undefined, type: 'ClearSelectedUser' } |
    { type: 'EndSubmit' } |
    { type: 'SetEmptySumbitError' };

type State = {
    errors?: FormError[];
    errorDescription: string;
    errorTitle: string;
    inputValue: string;
    selectedUser?: Item | string;
    selectedUsers: Item[];
    submitting: boolean;
    users: Item[];
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
    case 'AddError':
        return { ...state,
            errorDescription: 'Something went wrong while adding the following users. Please try again.',
            errorTitle: 'There was an error adding the users',
            errors: [...state.errors || [], action.payload]
        };
    case 'BeginSubmit':
        return { ...state, errors: undefined, submitting: true };
    case 'AddToSelection':
        return { ...state, errors: undefined, selectedUsers: [...[], ...state.selectedUsers, action.payload] };
    case 'RemoveFromSelection':
        return { ...state, selectedUsers: [...state.selectedUsers.filter(user => user.value !== action.payload.value)] };
    case 'ClearSelectedUser':
        return { ...state, selectedUser: '' };
    case 'PopulateUsers':
        return { ...state, users: action.payload };
    case 'EndSubmit':
        return { ...state, submitting: false };
    case 'SetEmptySumbitError':
        return { ...state, errorDescription: 'Please select some users before submitting.', errorTitle: 'No users selected', errors: [] };
    }
    return state;
};

const AddToTeam : React.FC <UserSearchProps> = ({ history, match }) => {

    const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
        errorDescription: '',
        errorTitle: '',
        inputValue: '',
        errors: undefined,
        selectedUser: undefined,
        selectedUsers: [],
        submitting: false,
        users: []
    });

    const { params: { teamId } } = match;

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
            )
        )
        .then(() => {
            history.push(`/team_view/${teamId}`);
        })
        .finally(() => dispatch({ type: 'EndSubmit' }));
    };

    const onSelectedUserChange = useCallback((selectedUser: Item) => {
        dispatch({ type:'AddToSelection', payload: selectedUser });
        dispatch({ type:'ClearSelectedUser', payload: undefined });
    }, []);

    useEffect(() => {
        getUsers()
            .then((res: UserResponse) => {
                setTimeout(() => dispatch({ type: 'PopulateUsers', payload: res.data }), 3000);
            });
    }, []);

    return (
        <>
            <div className="govuk-form-group">
                <ErrorSummary
                    heading={state.errorTitle}
                    description={state.errorDescription}
                    errors={state.errors}
                />
                <h1 className="govuk-heading-xl">
                    Add users to the team
                </h1>
                <div>
                    <TypeAhead
                        choices={state.users.filter(user => !state.selectedUsers.some(selectedUser => selectedUser.value === user.value))}
                        clearable={true}
                        disabled={false}
                        label={'Users'}
                        name={'Users'}
                        onSelectedItemChange={onSelectedUserChange}
                        value={state.selectedUser}
                    ></TypeAhead>
                </div>
            </div>
            <h2 className="govuk-heading-l">Users to be added</h2>
            <table className="govuk-table">
                <tbody className="govuk-table__body">
                { state.selectedUsers.map(user => (
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
                )) }
                </tbody>
            </table>
            <button
                type="submit"
                className="govuk-button view-team-button"
                onClick={onSubmit}>Add selected users</button>
        </>
    );
};

export default AddToTeam;
