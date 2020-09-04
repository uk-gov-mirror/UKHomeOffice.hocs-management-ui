import React, { Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';
import Submit from '../../../common/components/forms/submit';
import Text from '../../../common/components/forms/text';
import { ApplicationConsumer } from '../../../contexts/application';
import { createListItem } from '../../../services/entityListService';
import { reducer } from './addCampaignReducer';
import ErrorSummary from '../../../common/components/errorSummary';
import { GENERAL_ERROR_TITLE, ADD_CAMPAIGN_ERROR_DESCRIPTION, ADD_CAMPAIGN_SUCCESS, VALIDATION_ERROR_TITLE, DUPLICATE_CAMPAIGN_DESCRIPTION } from '../../../models/constants';
import useError from '../../../hooks/useError';
import ErrorMessage from '../../../models/errorMessage';
import EntityListItem from '../../../models/entityListItem';
import { validate } from '../../../validation';
import InputEventData from '../../../models/inputEventData';

interface AddUnitProps extends RouteComponentProps {
    csrfToken?: string;
}

const validationSchema = object({
    title: string()
        .required()
        .label('Campaign name')
        .matches(/^[a-zA-Z0-9_,.!? ()&]*$/),
    simpleName: string()
        .required()
        .label('Campaign code')
        .matches(/^[a-zA-Z0-9_,.!? ()&]*$/)
});

const AddCampaign: React.FC<AddUnitProps> = ({ csrfToken, history }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', VALIDATION_ERROR_TITLE);
    const [campaign, dispatch] = React.useReducer<Reducer<EntityListItem, InputEventData>>(reducer, {
        uuid: '',
        title: '',
        simpleName: ''
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, campaign, addFormError)) {
            createListItem(campaign, 'MPAM_CAMPAIGNS').then(() => {
                history.push('/', { successMessage: ADD_CAMPAIGN_SUCCESS });
            }).catch((error) => {
                if (error && error.response && error.response.status === 409) {
                    setErrorMessage(new ErrorMessage(DUPLICATE_CAMPAIGN_DESCRIPTION, VALIDATION_ERROR_TITLE));
                } else {
                    setErrorMessage(new ErrorMessage(ADD_CAMPAIGN_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                }
            });
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <Link to="/manage-mpam-campaigns" className="govuk-back-link">Back</Link>
                    <ErrorSummary
                        pageError={pageError}
                    />
                    <h1 className="govuk-heading-xl">
                        Add Campaign
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form action="/api/entity/list/MPAM_CAMPAIGNS" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <Text
                            label="Campaign name"
                            name="title"
                            type="text"
                            updateState={({ name, value }) => dispatch({ name, value })}
                            value={campaign.title}
                        />
                        <Text
                            label="Campaign code"
                            name="simpleName"
                            type="text"
                            updateState={({ name, value }) => dispatch({ name, value })}
                            value={campaign.simpleName}
                        />
                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

const WrappedAddUnit = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <AddCampaign csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddUnit;
