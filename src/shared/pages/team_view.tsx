import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { deleteUserFromTeam, getTeamMembers } from '../services/usersService';
import { getTeam } from '../services/teamsService';

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
    history.push(`/team/${teamId}/add-users`);
};

const onBackLinkClick = (history: History) => {
    history.push('/team_search');
};

const TeamView: React.FC<TeamMembersProps> = ({ history, match }) => {

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [teamMembersLoaded, setTeamMembersLoaded] = useState(false);
    const [teamName, setTeamName] = useState<string | undefined>('');

    const { params: { teamId } } = match;

    useEffect(() => {
        getTeam(teamId).then(response => setTeamName(response.displayName));
        getTeamMembers(teamId)
            .then((teamMembers: TeamMember[]) => {
                setTeamMembers(teamMembers);
                setTeamMembersLoaded(true);
            });
    }, []);

    const removeTeamMember = (userUUID: string, teamId: string) => {
        deleteUserFromTeam(userUUID, teamId)
            .then(() => {
                getTeamMembers(teamId)
                    .then((teamMembers: TeamMember[]) => {
                        setTeamMembers(teamMembers);
                    });
            })
            .catch(error => {
                throw error;
            });
    };

    const DisplayTeamTable = () => (
        <div>
            <div>
                {teamMembersLoaded && (
                    <table className="govuk-table">
                        <thead className="govuk-table__head">
                            <tr className="govuk-table__row">
                                <th className="govuk-table__header" scope="col">Team members</th>
                                <th className="govuk-table__header" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="govuk-table__body">
                            {
                                teamMembers.map((teamMember) => {
                                    return (
                                        <tr className="govuk-table__row">
                                            <td className="govuk-table__cell">{teamMember.label}</td>
                                            <td className="govuk-table__cell"><a href="#" onClick={() => removeTeamMember(teamMember.value, teamId as string)}>Remove</a></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );

    return (
        <div className="govuk-form-group">
            <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
            <div>
                <h1 className="govuk-heading-xl">View and remove team members</h1>
                <h2 className="govuk-heading-l">
                    {`Team: ${teamName}`}
                </h2>
                {
                    teamMembersLoaded ?
                        <div>
                            <DisplayTeamTable />
                        </div> :
                        <div>
                            <p className="govuk-body">Loading...</p>
                        </div>
                }
                <button type="submit" className="govuk-button add-team-members-button" onClick={() => onAddTeamMembersAddClick(history, teamId as string)}>Add team members</button>
            </div>
        </div>
    );
};

export default TeamView;
