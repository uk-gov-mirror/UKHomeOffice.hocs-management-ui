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
import { getTopics } from '../../../services/topicsService';
import Topic from '../../../models/topic';
import ErrorMessage from "../../../models/errorMessage";

interface TeamSearchProps {
    history: History;
}

const TopicSearch: React.FC<TeamSearchProps> = ({ history }) => {

    const [pageError, , , setErrorMessage] = useError();
    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);



    useEffect(() => {
        getTopics()
            .then((topics: Topic[]) => {
                dispatch({ type: 'SetTopics', payload: topics }); })
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
        history.push('/');
    };

    return (
        <div className="govuk-form-group">
            <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
            <ErrorSummary
                pageError={pageError}
            />
            <h1 className="govuk-heading-xl">
                Topic search
            </h1>
            {
                state.topicsLoaded ?
                    <div>
                        state topics
                        {state.topics}
                        <TypeAhead
                            choices={[ {label: 'one', value: 'one'}]}
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

            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(); }}>View linked teams</button>
        </div>
    );
};

export default TopicSearch;
