import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { string, object } from 'yup';
import Submit from '../../common/components/forms/submit';
import { ApplicationConsumer } from '../../contexts/application';
import ErrorSummary from '../../common/components/errorSummary';
import useError from '../../hooks/useError';
import * as constants from '../../models/constants';
import ErrorMessage from '../../models/errorMessage';
import { validate } from '../../validation';
import TypeAhead from '../../common/components/typeAhead';
import Item from '../../models/item';
import { getCaseTypes } from '../../services/caseTypesService';

interface ChooseCaseTypeProps extends RouteComponentProps {
    csrfToken?: string;
}

const validationSchema = object({
    value: string()
        .required()
        .label('Case Type')
});

const ChooseCaseType: React.FC<ChooseCaseTypeProps> = ({ csrfToken, history }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', constants.VALIDATION_ERROR_TITLE);

    const [selectedCaseType, setSelectedCaseType] = React.useState<Item>();

    const getCaseTypesForTypeahead = useCallback(() => new Promise<Item[]>((resolve) => {
        getCaseTypes()
            .then((caseTypes: Item[]) => {
                resolve(caseTypes);
            })
            .catch(() => {
                setErrorMessage(new ErrorMessage(constants.LOAD_CASE_TYPES_DESCRIPTION, constants.GENERAL_ERROR_TITLE));
                resolve([]);
            });
    }), []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, selectedCaseType, addFormError)) {
            history.push(`/case-type/${selectedCaseType!.value}`);
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <Link to="/" className="govuk-back-link">Back</Link>
                    <ErrorSummary pageError={pageError} />
                    <h1 className="govuk-heading-xl">
                        Select a Case Type
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form action="/api/template" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <TypeAhead
                            clearable={true}
                            disabled={false}
                            getOptions={getCaseTypesForTypeahead}
                            label={'Case Types'}
                            name={'case-types'}
                            onSelectedItemChange={setSelectedCaseType}
                            value={selectedCaseType}
                        />
                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

const WrappedChooseCaseType = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <ChooseCaseType csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedChooseCaseType;
