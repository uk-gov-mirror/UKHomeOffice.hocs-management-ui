import React, { Fragment, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import ErrorSummary from '../../../common/components/errorSummary';
import ErrorMessage from '../../../models/errorMessage';
import useError from '../../../hooks/useError';
import { Link } from 'react-router-dom';
import { getTeamsForUser } from '../../../services/teamsService';
import Item from '../../../models/item';
import { deleteUserFromTeam, getUser } from '../../../services/usersService';
import { GENERAL_ERROR_TITLE, LOAD_TEAMS_ERROR_DESCRIPTION, LOAD_USER_ERROR_DESCRIPTION, REMOVE_FROM_TEAM_ALLOCATED_ERROR_DESCRIPTION, REMOVE_FROM_TEAM_ERROR_DESCRIPTION, VALIDATION_ERROR_TITLE } from '../../../models/constants';

interface MatchParams {
    userId: string;
}

interface UserMembersProps extends RouteComponentProps<MatchParams> { }

const onAddUsersAddClick = (history: History, userId: string) => {
    history.push(`/user/${userId}/add-teams`);
};

const UserView: React.FC<UserMembersProps> = ({ history, match }) => {

    const [pageError, , clearErrors, setErrorMessage] = useError();
    const { params: { userId } } = match;
    const [user, setUser] = React.useState();
    const [teams, setTeams] = React.useState<Item[]>([]);

    useEffect(() => {
        getTeamsForUser(userId)
            .then((teams) => {
                setTeams(teams);
            })
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TEAMS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });

        getUser(userId)
            .then(user => setUser(user))
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_USER_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
    }, []);

    const removeUser = (userId: string, teamId: string, event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        deleteUserFromTeam(userId, teamId)
            .then(() => {
                getTeamsForUser(userId)
                    .then((teams) => {
                        setTeams(teams);
                    })
                    .catch(() => {
                        setErrorMessage(new ErrorMessage(LOAD_TEAMS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                    });
            })
            .catch((error) => {
                if (error && error.response && error.response.status === 409) {
                    setErrorMessage(new ErrorMessage(REMOVE_FROM_TEAM_ALLOCATED_ERROR_DESCRIPTION, VALIDATION_ERROR_TITLE));
                } else {
                    setErrorMessage(new ErrorMessage(REMOVE_FROM_TEAM_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                }
            });
    };

    const DisplayUserTable = () => (
        <Fragment>
                <table className="govuk-table">
                    <thead className="govuk-table__head">
                        <tr className="govuk-table__row">
                            <th className="govuk-table__header" scope="col">Teams</th>
                            <th className="govuk-table__header" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="govuk-table__body">
                        {
                            teams.map((team: Item) => {
                                return (
                                    <tr className="govuk-table__row" key={team.value}>
                                        <td className="govuk-table__cell">{team.label}</td>
                                        <td className="govuk-table__cell">
                                            <a href="#" onClick={event => removeUser(userId, team.value as string, event)}>Remove</a>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
        </Fragment>
    );

    return (
        <div className="govuk-form-group">
            <Link to="/user-search" className="govuk-back-link">Back</Link>
            <ErrorSummary
                pageError={pageError}
            />
            <div>
                <h1 className="govuk-heading-xl">View and remove teams</h1>
                {
                    user ?
                        <h2 className="govuk-heading-l">
                            {`User: ${user.label}`}
                        </h2> :
                        <h2>
                            User: Loading...
                        </h2>
                }
                {
                    teams.length > 0 ?
                        <div>
                            <DisplayUserTable />
                        </div> :
                        <div>
                            <p className="govuk-body">Loading...</p>
                        </div>
                }
                <button type="submit" className="govuk-button govuk-!-margin-right-1 add-user-members-button" data-module="govuk-button" onClick={() => onAddUsersAddClick(history, userId as string)}>Add teams</button>
            </div>
        </div>
    );
};

export default UserView;
