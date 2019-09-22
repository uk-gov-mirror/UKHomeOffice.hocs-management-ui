<<<<<<< HEAD:src/shared/pages/team/teamSearch/teamSearch.tsx
import React, { useEffect, Reducer} from 'react';
import TypeAhead from '../../../common/components/type-ahead';
import {getTeams} from '../../../services/teamsService';
=======
import React, { useEffect, useState } from 'react';
import TypeAhead from '../common/components/typeAhead';
import axios from 'axios';
>>>>>>> 6b6db1fcfb0edd640e7415c9ef2bb62192148dee:src/shared/pages/team_search.tsx
import { History } from 'history';
import {State} from "./state";
import {Action} from "./actions";
import {reducer} from "./reducer";
import {initialState} from "./initialState";
import Team from "../../../models/team";

interface TeamSearchProps {
    history: History;
}

const TeamSearch: React.FC<TeamSearchProps> = ({ history }) => {

    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    useEffect(() => {
        getTeams()
            .then((teams: Team[]) => {
                // @ts-ignore
                dispatch(  { type: 'SetTeams', payload: teams })
            });
    }, []);

    // @ts-ignore
    const onSelectedTeamChange = (selectedTeam) => {
        console.log('selected team', selectedTeam)
        dispatch({ type: 'AddTeamUUID', payload: selectedTeam.value });

    }

    const handleOnSubmit = () => {
        history.push('/team_view/' + state.teamUUID);
    };

    const onBackLinkClick = (history: History) => {
        history.push(`/`)
    };

    return (
        <div className="govuk-form-group">
            <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
            <h1 className="govuk-heading-xl">
                Team search
            </h1>
            {
<<<<<<< HEAD:src/shared/pages/team/teamSearch/teamSearch.tsx
                state.teamsLoaded ?
                <div>
                    <TypeAhead
                        choices={state.teams}
                        clearable={true}
                        disabled={false}
                        label={'Teams'}
                        name={'Teams'}
                        onSelectedItemChange={onSelectedTeamChange}
                    ></TypeAhead>
                </div> :
                <div>
                    ...loading
=======
                teamsLoaded ?
                    <div>
                        <TypeAhead
                            choices={teams}
                            clearable={true}
                            disabled={false}
                            label={'Teams'}
                            name={'Teams'}
                            onSelectedItemChange={(selectedTeam: Item) => setTeamUUID(selectedTeam.value)}
                        ></TypeAhead>
                    </div> :
                    <div>
                        ...loading
>>>>>>> 6b6db1fcfb0edd640e7415c9ef2bb62192148dee:src/shared/pages/team_search.tsx
                </div>
            }

            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(); }}>View team</button>
        </div>
    );
};

export default TeamSearch;
