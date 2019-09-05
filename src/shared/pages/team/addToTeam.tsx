import React, { useEffect, useState } from 'react';
import TypeAhead from '../../common/components/type-ahead';
import axios from 'axios';
import { History } from 'history';
import { match } from 'react-router';

interface UserResponse {
    data: User[];
}

interface User {
    label: string;
    value: string;
}

interface UserSearchProps {
    history: History;
    match: match;
}

const AddToTeam : React.FC <UserSearchProps> = ({ history, match }) => {

    const [users, setUsers] = useState<User[]>([]);
    const [usersLoaded, setUsersLoaded] = useState(false);
    // const [userUUID, setUserUUID] = useState('');
    const { params: teamId } = match;

    useEffect(() => {
        axios.get('/api/user')
            .then((res: UserResponse) => {
                setUsers(res.data);
                setUsersLoaded(true);
            });
    }, []);

    const handleOnSubmit = () => {
        // console.log(userUUID);
        history.push(`/team_view/${teamId}`);
    };

    return (
        <div className="govuk-form-group">
            <h1 className="govuk-heading-xl">
                { `Add users to the ${teamId} team` }
            </h1>
            {
                usersLoaded ?
                    <div>
                        <TypeAhead
                            choices={[{ label: 'Users', options: users }]}
                            clearable={true}
                            disabled={false}
                            label={'Teams'}
                            name={'Teams'}
                            updateState={() => {}}
                        ></TypeAhead>
                    </div> :
                    <div>
                        ...loading
                    </div>
            }

            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(); }}>Add users</button>
        </div>
    );
};

export default AddToTeam;
