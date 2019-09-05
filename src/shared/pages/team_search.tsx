import React, { useEffect, useState } from 'react';
import TypeAhead, { Item } from '../common/components/type-ahead';
import axios from 'axios';
import { History } from 'history';

interface TeamsResponse {
    data: Team[];
}

interface Team {
    label: string;
    value: string;
}

interface TeamSearchProps {
    history: History;
}

const TeamSearch : React.FC <TeamSearchProps> = ({ history }) => {

    const [teams, setTeams] = useState<Item[]>([{ label: 'Loading teams...', value: '' }]);
    const [teamsLoaded, setTeamsLoaded] = useState(false);
    const [teamUUID, setTeamUUID] = useState('');

    useEffect(() => {
        axios.get('api/teams')
            .then((res: TeamsResponse) => {
                setTeams(res.data);
                setTeamsLoaded(true);
            });
    }, []);

    const handleOnSubmit = () => {
        console.log(teamUUID);
        history.push('/team_view/' + teamUUID);
    };

    return (
        <div className="govuk-form-group">
            <h1 className="govuk-heading-xl">
                Team search
            </h1>
            {
                teamsLoaded ?
                <div>
                    <TypeAhead
                        choices={teams}
                        clearable={true}
                        disabled={false}
                        label={'Teams'}
                        name={'Teams'}
                        updateState={setTeamUUID}
                    ></TypeAhead>
                </div> :
                <div>
                    ...loading
                </div>
            }

            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(); }}>View team</button>
        </div>
    );
};

export default TeamSearch;
