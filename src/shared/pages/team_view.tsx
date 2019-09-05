import React, {useEffect, useState} from 'react';
import TypeAhead from "../common/components/type-ahead";
import axios from "axios";
import { History } from "history";
import { match } from 'react-router';

interface TeamsMembersResponse {
    data: TeamMember[];
}

interface TeamMember {
    label: string;
    value: string
}

interface TeamMembersProps {
    match: match
    history: History
}

const TeamView : React.FC <TeamMembersProps> = ({ match }) => {

    console.log('match.params', match.params);
    const [teamMembers, setTeamMembers] = useState <TeamMember[]>([]);
    const [teamMembersLoaded, setTeamMembersLoaded] = useState(false);

    useEffect(() => {
        axios.get('api/team/c37fd816-7b35-48c7-a769-944a7f566fd8/members')
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
                            <td className="govuk-table__cell"><a href={"#"}>Remove</a></td>
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
                            choices={[{ label: 'Teams', options: teamMembers }]}
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

        </div>
    );
};

export default TeamView;
