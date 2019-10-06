import React, { useEffect, Reducer } from 'react';
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
    GENERAL_ERROR_TITLE,
    LOAD_TOPICS_ERROR_DESCRIPTION
} from '../../../models/constants';
import { getTopic } from '../../../services/topicsService';
import Topic from '../../../models/topic';
import ErrorMessage from "../../../models/errorMessage";

interface TeamSearchProps {
    history: History;
}

const TopicView: React.FC<TeamSearchProps> = ({ history }) => {

    const [pageError, , , setErrorMessage] = useError();

    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    useEffect(() => {
        getTopic(state.topicValue)
            .then((topic: Topic[]) => { dispatch({ type: 'SetTopic', payload: topic}); })
            .catch(() => {
                dispatch({ type: 'SetGeneralError', payload: { description: LOAD_TOPICS_ERROR_DESCRIPTION, title: GENERAL_ERROR_TITLE }
                });
            });
    }, []);

    const onSelectedTopicChange = (selectedTopic: any) => {
        dispatch({ type: 'SetTopicValue', payload: selectedTopic.value });
    };

    const handleOnSubmit = () => {
        if (state.topicValue === '') {
            setErrorMessage(new ErrorMessage(EMPTY_SUBMIT_TOPIC_ERROR_DESCRIPTION, EMPTY_SUBMIT_TOPIC_ERROR_TITLE));
        } else {
            history.push(`/topic/${state.topicValue}`);
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
                {`Topic: ${state.topicValue}`}
            </h2>
            {
                state.topicsLoaded ?
                    <div>
                        <TypeAhead
                            choices={state.topic}
                            clearable={true}
                            disabled={false}
                            label={'Team assignment for Initial Draft and QA Response stages'}
                            name={'Draft-QA'}
                            onSelectedItemChange={onSelectedTopicChange}
                        ></TypeAhead>
                    </div> :
                    <div>
                        ...loading
                    </div>
            }
            {
                state.topicsLoaded ?
                    <div>
                        <TypeAhead
                            choices={state.topic}
                            clearable={true}
                            disabled={false}
                            label={'Team assignment for Private Office/Minister Sign Off stages'}
                            name={'Private-Minister'}
                            onSelectedItemChange={onSelectedTopicChange}
                        ></TypeAhead>
                    </div> :
                    <div>
                        ...loading
                    </div>
            }

            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(); }}>View linked teams</button>
        </div>
    );
};

export default TopicView;
