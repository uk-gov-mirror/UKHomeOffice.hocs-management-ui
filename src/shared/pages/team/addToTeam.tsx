import React, { useEffect, useState } from 'react';
import TypeAhead, { Choice } from '../../common/components/type-ahead';
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

    const [users, setUsers] = useState<Choice[]>([{ label: 'Loading Users...', options: [] }]);
    const [usersLoaded, setUsersLoaded] = useState(false);
    // const [userUUID, setUserUUID] = useState('');
    const { params: { teamId } } = match;

    useEffect(() => {
        axios.get('/api/users')
            .then((res: UserResponse) => {
                setUsers([{ label: 'Users', options: res.data }]);
                setUsersLoaded(true);
            });
    }, []);

    return (
        <div className="govuk-form-group">
            <h1 className="govuk-heading-xl">
                { `Add users to the ${teamId} team` }
            </h1>
            {
                usersLoaded ?
                    <div>
                        <TypeAhead
                            choices={users}
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

            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(history, teamId); }}>Add users</button>
        </div>
    );
};

export default AddToTeam;
