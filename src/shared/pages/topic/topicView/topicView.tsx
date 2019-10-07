import React, { useEffect, Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import TypeAhead from '../../../common/components/typeAhead';
import { History } from 'history';
import { State } from './state';
import { Action } from './actions';
import { reducer } from './reducer';
import { initialState } from './initialState';
import useError from '../../../hooks/useError';
import ErrorSummary from '../../../common/components/errorSummary';
import {
    EMPTY_SUBMIT_TOPIC_ERROR_DESCRIPTION,
    EMPTY_SUBMIT_TOPIC_ERROR_TITLE,
    GENERAL_ERROR_TITLE, LOAD_TEAMS_ERROR_DESCRIPTION,
    LOAD_TOPICS_ERROR_DESCRIPTION
} from '../../../models/constants';
import { getTopic } from '../../../services/topicsService';
import { getTeams } from "../../../services/teamsService";
import Topic from '../../../models/topic';
import ErrorMessage from "../../../models/errorMessage";

interface MatchParams {
    topicId: string;
}

interface TeamViewProps extends RouteComponentProps<MatchParams> { }

const TopicView: React.FC<TeamViewProps> = ({ history, match }) => {

    const [pageError, , , setErrorMessage] = useError();
    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    const { params: { topicId } } = match;


    useEffect(() => {
        getTopic(topicId)
            .then((topic) => { dispatch({ type: 'SetTopicName', payload: topic.label}); })
            .catch(() => {
                dispatch({ type: 'SetGeneralError', payload: { description: LOAD_TOPICS_ERROR_DESCRIPTION, title: GENERAL_ERROR_TITLE }
                });
            });
        getTeams()
            .then((teams: Topic[]) => { dispatch({ type: 'SetTeams', payload: teams }); })
            .catch(() => setErrorMessage(new ErrorMessage(LOAD_TEAMS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE)));
    }, []);

    const onSelectedPrivateMinisterChange = (selectedTeamAssignment: any) => {
        dispatch({ type: 'SetPrivateMinisterTeam', payload: selectedTeamAssignment.label });
    };

    const onSelectedDraftQAChange = (selectedTeamAssignment: any) => {
        dispatch({ type: 'SetDraftQATeam', payload: selectedTeamAssignment.label });
    };

    const handleOnSubmit = () => {
        if (state.privateMinisterTeam === '' || state.draftQATeam === '') {
            setErrorMessage(new ErrorMessage(EMPTY_SUBMIT_TOPIC_ERROR_DESCRIPTION, EMPTY_SUBMIT_TOPIC_ERROR_TITLE));
        } else {
            history.push(`/topic/${state.topicName}/private-minister/${state.privateMinisterTeam}/draft-qa/${state.draftQATeam}`);
        }
    };

    const onBackLinkClick = (history: History) => {
        history.push('/topic-to-team');
    };

    return (
        <div className="govuk-form-group">
            <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
            <ErrorSummary
                pageError={pageError}
            />
            <h1 className="govuk-heading-xl">
                Topic View
            </h1>
            <h2 className="govuk-heading-l">
                {`Topic: ${state.topicName}`}
            </h2>
            {
                state.teamsLoaded ?
                    <div>
                        <TypeAhead
                            choices={state.teams}
                            clearable={true}
                            disabled={false}
                            label={'Select team assignment for Initial Draft and QA response stages'}
                            name={'Draft-QA'}
                            onSelectedItemChange={onSelectedDraftQAChange}
                        ></TypeAhead>
                    </div> :
                    <div>
                        ...loading
                    </div>
            }
            {
                state.teamsLoaded ?
                    <div>
                        <TypeAhead
                            choices={state.teams}
                            clearable={true}
                            disabled={false}
                            label={'Select team assignment for Private Office/Minister sign off stages'}
                            name={'Private-Minister'}
                            onSelectedItemChange={onSelectedPrivateMinisterChange}
                        ></TypeAhead>
                    </div> :
                    <div>
                        ...loading
                    </div>
            }

            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(); }}>Continue</button>
        </div>
    );
};

export default TopicView;
