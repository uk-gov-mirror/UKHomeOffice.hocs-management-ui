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
    EMPTY_SUBMIT_TOPIC_ERROR_TITLE,
} from '../../../models/constants';
import ErrorMessage from "../../../models/errorMessage";

interface MatchParams {
    privateMinister: string;
    draftQa: string;
    topicName: string;
}

interface addTeamToTopicProps extends RouteComponentProps<MatchParams> { }

const addTeamToTopicView: React.FC<addTeamToTopicProps> = ({ history, match }) => {

    const [pageError, , , setErrorMessage] = useError();
    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    const { params: { topicName, privateMinister, draftQa } } = match;
    useEffect(() => {
        dispatch({ type: 'SetPrivateMinisterTeam', payload: privateMinister });
        dispatch({ type: 'SetDraftQATeam', payload: draftQa });
        dispatch({ type: 'SetTopicName', payload: topicName });
    }, []);

    const handleOnSubmit = () => {
        if (state.topicName === '') {
            setErrorMessage(new ErrorMessage(EMPTY_SUBMIT_TOPIC_ERROR_DESCRIPTION, EMPTY_SUBMIT_TOPIC_ERROR_TITLE));
        } else {
            history.push(`/topic/${state.topicName}/privateMinister/${state.privateMinisterTeam}/draftQA/${state.draftQaTeam}`);
        }
    };

    const onBackLinkClick = (history: History) => {
        history.push(`/topic/${state.topicName}`);
    };

    return (
        <div className="govuk-form-group">
            <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
            <ErrorSummary
                pageError={pageError}
            />
            <h1 className="govuk-heading-xl">
                Summary
            </h1>
            <h2 className="govuk-heading-l">
                {`Topic: ${state.topicName}`}
            </h2>
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
                            {state.draftQaTeam}
                        </td>
                    </tr>
                    <tr className="govuk-table__row">
                        <th scope="row" className="govuk-table__header">
                            Private Office/Minister
                        </th>
                        <td className="govuk-table__cell">
                            {state.privateMinisterTeam}
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="govuk-button view-team-button" onClick={() => { handleOnSubmit(); }}>Confirm and Submit</button>
        </div>
    );
};

export default addTeamToTopicView;
