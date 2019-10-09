import React, { useEffect, Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { State } from './state';
import { Action } from './actions';
import { reducer } from './reducer';
import { initialState } from './initialState';
import useError from '../../../hooks/useError';
import ErrorSummary from '../../../common/components/errorSummary';
import {
    EMPTY_SUBMIT_TOPIC_ERROR_DESCRIPTION,
    EMPTY_SUBMIT_TOPIC_ERROR_TITLE, GENERAL_ERROR_TITLE, LOAD_TEAM_ERROR_DESCRIPTION, LOAD_TOPIC_ERROR_DESCRIPTION,
} from '../../../models/constants';
import ErrorMessage from "../../../models/errorMessage";
import {ContextAction} from "../../../contexts/actions";
import {Link} from "react-router-dom";
import Submit from "../../../common/components/forms/submit";
import {getTopic} from "../../../services/topicsService";
import Item from "../../../models/item";
import {getTeam} from "../../../services/teamsService";
import Team from "../../../models/team";

interface MatchParams {
    privateMinisterValue: string;
    draftQaValue: string;
    topicValue: string;
}

interface addTeamToTopicProps extends RouteComponentProps<MatchParams> {
    csrfToken?: string;
    contextDispatch: (action: ContextAction<any>) => Promise<any>;
    history: History;
}

const addTeamToTopicView: React.FC<addTeamToTopicProps> = ({csrfToken, history, match }) => {

    const [pageError, , , setErrorMessage] = useError();
    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    const { params: { topicValue, privateMinisterValue, draftQaValue } } = match;

    useEffect(() => {
        getTopic(topicValue)
            .then((topic: Item) => { dispatch({ type: 'SetTopic', payload: topic}); })
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TOPIC_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
        getTeam(privateMinisterValue)
            .then((team: Team) => dispatch({ type: 'SetPrivateMinisterTeam', payload: team }))
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TEAM_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
        getTeam(draftQaValue)
            .then((team: Team) => dispatch({ type: 'SetDraftQATeam', payload: team }))
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_TEAM_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
    }, []);

    const handleOnSubmit = () => {
        if (state.topic.value === '') {
            setErrorMessage(new ErrorMessage(EMPTY_SUBMIT_TOPIC_ERROR_DESCRIPTION, EMPTY_SUBMIT_TOPIC_ERROR_TITLE));
        } else {
            history.push(`/topic/${state.topic.value}/privateMinister/${state.privateMinisterTeam.type}/draftQA/${state.draftQaTeam.type}/dcu`);
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <Link to="/topic/${state.topicName}" className="govuk-back-link">Back</Link>
                    <ErrorSummary
                        pageError={pageError}
                    />
                    <h1 className="govuk-heading-xl">
                        Summary
                    </h1>
                    <h2 className="govuk-heading-l">
                        {`Topic: ${state.topic.label}`}
                    </h2>
                </div>
            </div>
            <div className="govuk-form-group">
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-one-half-from-desktop">
                        <form method="POST" onSubmit={handleOnSubmit}>
                            <input type="hidden" name="_csrf" value={csrfToken} />
                            <table className="govuk-table">
                                <thead className="govuk-table__head">
                                <tr className="govuk-table__row">
                                    <th scope="col" className="govuk-table__header">Stages</th>
                                    <th scope="col" className="govuk-table__header">Team assignment</th>
                                </tr>
                                </thead>
                                <tbody className="govuk-table__body">
                                <tr className="govuk-table__row">
                                    <th scope="row" className="govuk-table__header">
                                        Draft/QA
                                    </th>
                                    <td className="govuk-table__cell">
                                        {state.draftQaTeam.displayName}
                                    </td>
                                </tr>
                                <tr className="govuk-table__row">
                                    <th scope="row" className="govuk-table__header">
                                        Private Office/Minister
                                    </th>
                                    <td className="govuk-table__cell">
                                        {state.privateMinisterTeam.displayName}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <Submit />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default addTeamToTopicView;
