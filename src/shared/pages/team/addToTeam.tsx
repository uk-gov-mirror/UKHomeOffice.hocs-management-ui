import React, { useEffect, useState, useCallback, useReducer } from 'react';
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

const AddToTeam : React.FC <UserSearchProps> = ({ history, match }) => {

    const [users, setUsers] = useState<Item[]>([{ label: 'Loading users...', value: '' }]);
    const [selectedUsers, setSelectedUsers] = useState<Item[]>([]);
    const [selectedUser, setSelectedUser] = useState<Item>();

    type Action = { payload: FormError, type: 'AddError' } | { type: 'RemoveError' } | { type: 'ClearErrors' };

    type State = {
        postErrors?: FormError[];
    };

    const reducer = (state: State, action: Action) => {
        switch (action.type) {
        case 'AddError':
            return { ...state, postErrors: [...state.postErrors || [], action.payload] };
        case 'ClearErrors':
            return { ...state, postErrors: undefined };
        }
        return state;
    };

    const [state, dispatch] = useReducer(reducer, { postErrors: undefined });

    const { params: { teamId } } = match;

    useEffect(() => {
        getUsers()
            .then((res: UserResponse) => {
                setTimeout(() => setUsers(res.data), 3000);
            });
    }, []);

    const removeFromSelection = useCallback((userToRemove: Item) =>
        setSelectedUsers([...selectedUsers.filter(user => user.value !== userToRemove.value)])
    , [selectedUsers]);

    const addUsers = (teamId: string, users: Item[], successCallback: (user: Item) => void) =>
        Promise.all(users.map(user => addUserToTeam(user, teamId).then(() => successCallback(user))));

    // const addToPostErrors = (key: string, value: string) => setPostErrors([...postErrors || [], { key, value }]);

    const onSubmit = () => {
        dispatch({ type: 'ClearErrors' });
        addUsers(teamId, selectedUsers, removeFromSelection)
            .then(() => {
                history.push(`/team_view/${teamId}`);
            })
            .catch(({ userToAdd: { label, value } }: AddUserError) => {
                setTimeout(() => {
                    dispatch({ type: 'AddError', payload: { key: value, value: label } });
                }, 5000);
            });
    };

    const onSelectedUserChangeHandler = onSelectedUserChange.bind(null, addToSelectionCreator(selectedUsers, setSelectedUsers), setSelectedUser);

    return (
        <>
            <div className="govuk-form-group">
                <h1 className="govuk-heading-xl">
                    Add users to the team
                </h1>
                <div>
                    <TypeAhead
                        choices={users.filter(user => !selectedUsers.some(selectedUser => selectedUser.value === user.value))}
                        clearable={true}
                        disabled={false}
                        label={'Users'}
                        name={'Users'}
                        onSelectedItemChange={onSelectedUserChangeHandler}
                        value={selectedUser}
                    ></TypeAhead>
                </div>
            </div>
            <ErrorSummary
                heading="Error adding users"
                description="Something went wrong while adding the following users. Please try again."
                errors={state.postErrors}
            />
            <h2 className="govuk-heading-l">Users to be added</h2>
            <table className="govuk-table">
                <tbody className="govuk-table__body">
                { selectedUsers.map(user => (
                    <tr key={user.value} className="govuk-table__row">
                        <th scope="row" className="govuk-table__header">
                            {user.label}
                        </th>
                        <td className="govuk-table__cell">
                            <a className="govuk-link" href="#">
                                Remove<span className="govuk-visually-hidden" onClick={() => removeFromSelection(user)}> user</span>
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

const onSelectedUserChange = (
    addToSelection: (user: Item) => void,
    setSelectedUser: React.Dispatch<React.SetStateAction<string | undefined>>,
    selectedUser: Item
) => {
    setSelectedUser('');
    addToSelection(selectedUser);
};

const addToSelectionCreator = (selectedUsers: Item[], setSelectedUsers: React.Dispatch<React.SetStateAction<Item[]>>) =>
    (userToAdd: Item) => setSelectedUsers([...[], ...selectedUsers, userToAdd]);

export default AddToTeam;
