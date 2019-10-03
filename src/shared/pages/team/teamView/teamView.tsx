import React, { Reducer, useEffect, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { deleteUserFromTeam } from '../../../services/usersService';
import { getTeam, getTeamMembers } from '../../../services/teamsService';
import { State } from './state';
import { Action } from './actions';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { User } from '../../../models/user';
import { GENERAL_ERROR_TITLE, LOAD_TEAM_ERROR_DESCRIPTION, LOAD_TEAM_MEMBERS_ERROR_DESCRIPTION } from '../../../models/constants';
import ErrorSummary from '../../../common/components/errorSummary';
import ErrorMessage from '../../../models/errorMessage';
import useError from '../../../hooks/useError';

interface MatchParams {
    teamId: string;
}

interface TeamMembersProps extends RouteComponentProps<MatchParams> { }

const onAddTeamMembersAddClick = (history: History, teamId: string) => {
    history.push(`/team/${teamId}/add-users`);
};

const onBackLinkClick = (history: History) => {
    history.push('/team-search');
};

const TeamView: React.FC<TeamMembersProps> = ({ history, match }) => {

    const [pageError, , , setErrorMessage] = useError();
    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    const { params: { teamId } } = match;

    useEffect(() => {
        getTeam(teamId)
            .then(team => dispatch({ type: 'SetTeamName', payload: team.displayName }))
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TEAM_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
        getTeamMembers(teamId)
            .then((users: User[]) => dispatch({ type: 'PopulateTeamMembers', payload: users }))
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TEAM_MEMBERS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
    }, []);

    const removeTeamMember = (userUUID: string, teamId: string) => {
        deleteUserFromTeam(userUUID, teamId)
            .then(() => {
                getTeamMembers(teamId)
                    .then((users: User[]) => dispatch({ type: 'PopulateTeamMembers', payload: users }))
                    .catch(() => {
                        setErrorMessage(new ErrorMessage(LOAD_TEAM_MEMBERS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                    });
            });
    };

    const DisplayTeamTable = () => (
        <Fragment>
            {state.teamMembersLoaded && (
            <table className="govuk-table">
                <thead className="govuk-table__head">
                    <tr className="govuk-table__row">
                        <th className="govuk-table__header" scope="col">Team members</th>
                        <th className="govuk-table__header" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className="govuk-table__body">
                    {
                        state.teamMembers.map((teamMember) => {
                            return (
                                <tr className="govuk-table__row" key={teamMember.value}>
                                    <td className="govuk-table__cell">{teamMember.label}</td>
                                    <td className="govuk-table__cell"><a href="#" onClick={() => removeTeamMember(teamMember.value, teamId as string)}>Remove</a></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        )}
        </Fragment>
    );

    return (
        <div className="govuk-form-group">
            <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
            <ErrorSummary
                pageError={pageError}
            />
            <div>
                <h1 className="govuk-heading-xl">View and remove team members</h1>
                <h2 className="govuk-heading-l">
                    {`Team: ${state.teamName}`}
                </h2>
                {
                    state.teamMembersLoaded ?
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
