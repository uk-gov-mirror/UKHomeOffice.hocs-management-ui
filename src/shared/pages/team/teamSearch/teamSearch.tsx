import React, { useCallback } from 'react';
import TypeAhead from '../../../common/components/typeAhead';
import { getTeams } from '../../../services/teamsService';
import { History } from 'history';
import Item from '../../../models/item';
import ErrorSummary from '../../../common/components/errorSummary';
import { GENERAL_ERROR_TITLE, LOAD_TEAMS_ERROR_DESCRIPTION, EMPTY_SUBMIT_TEAM_ERROR_DESCRIPTION, EMPTY_SUBMIT_TEAM_ERROR_TITLE } from '../../../models/constants';
import ErrorMessage from '../../../models/errorMessage';
import useError from '../../../hooks/useError';
import { Link } from 'react-router-dom';

interface TeamSearchProps {
    history: History;
}

const TeamSearch: React.FC<TeamSearchProps> = ({ history }) => {

    const [pageError, , clearErrors, setErrorMessage] = useError();
    const [selectedTeam, setSelectedTeam] = React.useState<Item>();

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        clearErrors();
        if (selectedTeam) {
            history.push(`/team-view/${selectedTeam!.value}`);
            return;
        }
        setErrorMessage(new ErrorMessage(EMPTY_SUBMIT_TEAM_ERROR_DESCRIPTION, EMPTY_SUBMIT_TEAM_ERROR_TITLE));
    };

    const getTeamsForTypeahead = useCallback(() => new Promise<Item[]>(resolve => getTeams()
        .then((teams: Item[]) => resolve(teams))
        .catch(() => {
            setErrorMessage(new ErrorMessage(LOAD_TEAMS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            resolve([]);
        })), []);

    return (
        <div className="govuk-form-group">
            <Link className="govuk-back-link" to="/">Back</Link>
            <ErrorSummary pageError={pageError} />
            <h1 className="govuk-heading-xl">
                Team search
            </h1>
            <TypeAhead
                clearable={true}
                disabled={false}
                getOptions={getTeamsForTypeahead}
                label={'Teams'}
                name={'Teams'}
                onSelectedItemChange={setSelectedTeam}
            />
            <button type="submit" className="govuk-button view-team-button" onClick={handleOnSubmit}>View team</button>
        </div>
    );
};

export default TeamSearch;
