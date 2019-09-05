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

const AddToTeam : React.FC <UserSearchProps> = ({ history, match }) => {

    const [users, setUsers] = useState<Item[]>([{ label: 'Loading users...', value: '' }]);
    const [, setUsersLoaded] = useState(false);
    // const [userUUID, setUserUUID] = useState('');
    const { params: { teamId } } = match;

    useEffect(() => {
        axios.get('/api/users')
            .then((res: UserResponse) => {
                setTimeout(() => setUsers(res.data), 3000);
                setUsersLoaded(true);
            });
    }, []);

    return (
        <div className="govuk-form-group">
            <h1 className="govuk-heading-xl">
                Add users to the team
            </h1>
            <div>
                <TypeAhead
                    choices={users}
                    clearable={true}
                    disabled={false}
                    label={'Users'}
                    name={'Users'}
                    updateState={() => {}}
                ></TypeAhead>
            </div>
            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(history, teamId); }}>Add users</button>
        </div>
    );
};

export default AddToTeam;
