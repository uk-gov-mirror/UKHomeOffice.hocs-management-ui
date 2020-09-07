import React, { Reducer, useEffect, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { getListItems } from '../../../services/entityListService';
import { State } from './state';
import { Action } from './actions';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { GENERAL_ERROR_TITLE, LOAD_CAMPAIGNS_ERROR_DESCRIPTION } from '../../../models/constants';
import ErrorSummary from '../../../common/components/errorSummary';
import ErrorMessage from '../../../models/errorMessage';
import useError from '../../../hooks/useError';
import { Link } from 'react-router-dom';
import EntityListItem from 'shared/models/entityListItem';

interface MatchParams {
    teamId: string;
}

interface TeamMembersProps extends RouteComponentProps<MatchParams> { }

const onAddClick = (history: History) => {
    history.push('/manage-mpam-campaigns/add');
};

const CampaignsView: React.FC<TeamMembersProps> = ({ history, match }) => {

    const [pageError, , clearErrors, setErrorMessage] = useError();
    const [state, dispatch] = React.useReducer<Reducer<State, Action>>(reducer, initialState);

    useEffect(() => {
        getListItems('MPAM_CAMPAIGNS')
            .then((campaigns: EntityListItem[]) => dispatch({ type: 'PopulateCampaigns', payload: campaigns }))
            .catch(() => {
                setErrorMessage(new ErrorMessage(LOAD_CAMPAIGNS_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
            });
    }, []);

    const amendCampaign = (campaignUUID: string, event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        history.push(`/manage-mpam-campaigns/${campaignUUID}/amend`);

    };

    const DisplayCampaignTable = () => (
        <Fragment>
            {state.campaignsLoaded && (
                <table className="govuk-table">
                    <thead className="govuk-table__head">
                        <tr className="govuk-table__row">
                            <th className="govuk-table__header" scope="col">Campaign name</th>
                            <th className="govuk-table__header" scope="col">Campaign code</th>
                            <th className="govuk-table__header" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="govuk-table__body">
                        {
                            state.campaigns.map((campaign) => {
                                return (
                                    <tr className="govuk-table__row" key={campaign.uuid}>
                                        <td className="govuk-table__cell">{campaign.title}</td>
                                        <td className="govuk-table__cell">{campaign.simpleName}</td>
                                        <td className="govuk-table__cell">
                                            <a href="#" onClick={event => amendCampaign(campaign.uuid, event)}>Amend</a>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            )}
        </Fragment>
    );

    return (
        <div className="govuk-form-group">
            <Link to="/" className="govuk-back-link">Back</Link>
            <ErrorSummary
                pageError={pageError}
            />
            <div>
                <h1 className="govuk-heading-xl">View and edit campaigns</h1>
                {
                    state.campaignsLoaded ?
                        <div>
                            <DisplayCampaignTable />
                        </div> :
                        <div>
                            <p className="govuk-body">Loading...</p>
                        </div>
                }
                <button type="submit" className="govuk-button govuk-!-margin-right-1 add-team-members-button" data-module="govuk-button" onClick={() => onAddClick(history)}>Add new campaign</button>
            </div>
        </div>
    );
};

export default CampaignsView;
