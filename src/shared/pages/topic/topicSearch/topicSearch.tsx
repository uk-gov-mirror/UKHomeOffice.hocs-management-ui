import React, { useEffect, Reducer } from 'react';
import TypeAhead from '../../../common/components/typeAhead';
import { History } from 'history';
import { State } from './state';
import { Action } from './actions';
import { reducer } from './reducer';
import { initialState } from './initialState';
import ErrorSummary from '../../../common/components/errorSummary';
import { GENERAL_ERROR_TITLE, LOAD_TEAMS_ERROR_DESCRIPTION } from '../../../models/constants';
import { getTopics } from '../../../services/topicService';
import Topic from '../../../models/topic';

interface TeamSearchProps {
    history: History;
}

const TopicSearch: React.FC<TeamSearchProps> = ({ history }) => {

    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    useEffect(() => {
        getTopics()
            .then((topics: Topic[]) => { dispatch({ type: 'SetTopics', payload: topics }); })
            .catch(() => {
                dispatch({ type: 'SetGeneralError', payload: { description: LOAD_TEAMS_ERROR_DESCRIPTION, title: GENERAL_ERROR_TITLE }
                });
            });
    }, []);

    const onSelectedTopicChange = (selectedTopic: any) => {
        dispatch({ type: 'SetTopicValue', payload: selectedTopic.value });

    };

    const handleOnSubmit = () => {
        history.push(`/team-view/${state.topicValue}`);
    };

    const onBackLinkClick = (history: History) => {
        history.push('/');
    };

    return (
        <div className="govuk-form-group">
            <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
            <ErrorSummary
                heading={state.errorTitle}
                description={state.errorDescription}
            />
            <h1 className="govuk-heading-xl">
                Topic search
            </h1>
            {
                state.topicsLoaded ?
                    <div>
                        <TypeAhead
                            choices={state.topics}
                            clearable={true}
                            disabled={false}
                            label={'Topics'}
                            name={'Topics'}
                            onSelectedItemChange={onSelectedTopicChange}
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

export default TopicSearch;
