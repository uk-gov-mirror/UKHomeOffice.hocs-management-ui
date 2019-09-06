import React, { useEffect, useState } from 'react';
import TypeAhead, { Item } from '../../common/components/type-ahead';
import axios from 'axios';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';

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

const handleOnSubmit = (history: History, teamId: string) => {
    history.push(`/team_view/${teamId}`);
};

const onSelectedUserChange = (selectedUsers: Item[], setSelectedUsers: (users: Item[]) => void, setSelectedUser: (user: string) => void, selectedUser: Item) => {
    setSelectedUser('');
    setSelectedUsers([...selectedUsers, selectedUser]);
};

const AddToTeam : React.FC <UserSearchProps> = ({ history, match }) => {

    const [users, setUsers] = useState<Item[]>([{ label: 'Loading users...', value: '' }]);
    const [, setUsersLoaded] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<Item[]>([]);
    const [selectedUser, setSelectedUser] = useState<Item>();

    const { params: { teamId } } = match;

    useEffect(() => {
        axios.get('/api/users')
            .then((res: UserResponse) => {
                setTimeout(() => setUsers(res.data), 3000);
                setUsersLoaded(true);
            });
    }, []);

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
                        onSelectedItemChange={onSelectedUserChange.bind(null, selectedUsers, setSelectedUsers, setSelectedUser)}
                        value={selectedUser}
                    ></TypeAhead>
                </div>
            </div>
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
                                Remove<span className="govuk-visually-hidden"> user</span>
                            </a>
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(history, teamId); }}>Add selected users</button>
        </>
    );
};

export default AddToTeam;
