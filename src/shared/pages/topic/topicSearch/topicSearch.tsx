import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import TypeAhead from '../../../common/components/typeAhead';
import { getTopics } from '../../../services/topicsService';
import { History } from 'history';
import useError from '../../../hooks/useError';
import ErrorSummary from '../../../common/components/errorSummary';
import {
    EMPTY_SUBMIT_TOPIC_ERROR_DESCRIPTION,
    EMPTY_SUBMIT_TOPIC_ERROR_TITLE,
    GENERAL_ERROR_TITLE,
    LOAD_TOPICS_ERROR_DESCRIPTION
} from '../../../models/constants';
import ErrorMessage from '../../../models/errorMessage';
import { Link } from 'react-router-dom';
import Submit from '../../../common/components/forms/submit';
import Item from '../../../models/item';

interface TopicSearchProps extends RouteComponentProps {
    csrfToken?: string;
    history: History;
}

const TopicSearch: React.FC<TopicSearchProps> = ({ csrfToken, history }) => {

    const [pageError, , , setErrorMessage] = useError();
    const [selectedTopic, setSelectedTopic] = React.useState<Item>();

    const getTopicsForTypeahead = useCallback(() => new Promise<Item[]>((resolve) => {
        getTopics()
            .then((topics: Item[]) => {
                resolve(topics);
            })
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TOPICS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                resolve([]);
            });
    }), []);

    const handleOnSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedTopic) {
            history.push(`/topic/${selectedTopic.value}`);
        } else {
            setErrorMessage(new ErrorMessage(EMPTY_SUBMIT_TOPIC_ERROR_DESCRIPTION, EMPTY_SUBMIT_TOPIC_ERROR_TITLE));
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <Link to="/" className="govuk-back-link">Back</Link>
                    <ErrorSummary
                        pageError={pageError}
                    />
                    <h1 className="govuk-heading-xl">
                        Topic search
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form method="POST" onSubmit={handleOnSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <TypeAhead
                            clearable={true}
                            disabled={false}
                            getOptions={getTopicsForTypeahead}
                            label={'Topics'}
                            name={'topics'}
                            onSelectedItemChange={setSelectedTopic}
                        />
                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

export default TopicSearch;
