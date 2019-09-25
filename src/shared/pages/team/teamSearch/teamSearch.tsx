import React, { useEffect, Reducer} from 'react';
import TypeAhead from '../../../common/components/typeAhead';
import {getTeams} from '../../../services/teamsService';
import { History } from 'history';
import {State} from "./state";
import {Action} from "./actions";
import {reducer} from "./reducer";
import {initialState} from "./initialState";
import Item from "../../../models/item";

interface TeamSearchProps {
    history: History;
}

const TeamSearch: React.FC<TeamSearchProps> = ({ history }) => {

    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    useEffect(() => {
        getTeams()
            .then((teams: Item[]) => {
                dispatch(  { type: 'SetTeams', payload: teams })
            });
    }, []);

    const onSelectedTeamChange = (selectedTeam: any) => {
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
                </div>
            }

            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(); }}>View team</button>
        </div>
    );
};

export default TeamSearch;
