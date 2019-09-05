import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { History } from 'history';
import TypeAhead from '../common/components/type-ahead';

interface TeamsMembersResponse {
    data: TeamMember[];
}

interface TeamMember {
    label: string;
    value: string;
}

interface MatchParams {
    teamId: string;
}

interface TeamMembersProps extends RouteComponentProps<MatchParams> {
    history: History;
}

const onAddTeamMembersAddClick = (history: History, teamId: string) => {

    history.push(`/addUsersToTeam/${teamId}`);
};

const TeamView : React.FC <TeamMembersProps> = ({ history, match }) => {

    console.log('match.params', match.params);
    const [teamMembers, setTeamMembers] = useState <TeamMember[]>([]);
    const [teamMembersLoaded, setTeamMembersLoaded] = useState(false);

    const { params: { teamId } } = match;

    useEffect(() => {
        axios.get(`/api/teams/${teamId}/members`)
            .then((res: TeamsMembersResponse) => {
                setTeamMembers(res.data);
                setTeamMembersLoaded(true);
            });
    }, []);

    const DisplayTeamTable = () => (
        <div>
            <div>
            </div>
            <div>
                {teamMembersLoaded && (
                    <table className="govuk-table">
                        <thead className="govuk-table__head">
                        <tr className="govuk-table__row">
                            <th className="govuk-table__header" scope="col">Team member</th>
                            <th className="govuk-table__header" scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="govuk-table__body">
                        <tr className="govuk-table__row">
                            <td className="govuk-table__cell"></td>
                            <td className="govuk-table__cell"><a href={'#'}>Remove</a></td>
                        </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );

    return (
        <div className="govuk-form-group">
            <h1 className="govuk-heading-xl">
                Team search
            </h1>
            {
                teamMembersLoaded ?
                    <div>
                        <TypeAhead
                            choices={teamMembers}
                            clearable={true}
                            disabled={false}
                            label={'TeamMembers'}
                            name={'TeamMembers'}
                            updateState={() => {
                            }}
                        ></TypeAhead>
                        <DisplayTeamTable/>
                    </div> :
                    <div>
                        ...loading
                    </div>
            }
            <button type="submit" className="govuk-button add-team-members-button" onClick={() => onAddTeamMembersAddClick(history, teamId as string)}>Add team members</button>
        </div>
    );
};

export default TeamView;
