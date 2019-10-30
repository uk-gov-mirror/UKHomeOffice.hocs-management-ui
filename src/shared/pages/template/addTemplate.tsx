import React, { Reducer, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { object, string, array } from 'yup';
import Submit from '../../common/components/forms/submit';
import { ApplicationConsumer } from '../../contexts/application';
import { reducer } from './reducer';
import ErrorSummary from '../../common/components/errorSummary';
import useError from '../../hooks/useError';
import * as constants from '../../models/constants';
import ErrorMessage from '../../models/errorMessage';
import InputEventData from '../../models/inputEventData';
import { validate } from '../../validation';
import DocumentAdd from '../../common/components/forms/documentAdd';
import TypeAhead from '../../common/components/typeAhead';
import Item from '../../models/item';
import Template from '../../models/template';
import { addTemplate } from '../../services/templatesService';
import { getCaseTypes } from '../../services/caseTypesService';

interface AddTemplateProps extends RouteComponentProps {
    csrfToken?: string;
}

const validationSchema = object({
    files: array()
        .max(1)
        .min(1)
        .required()
        .label('Template'),
    caseType: string()
        .required()
        .label('Case Types')
});

const AddTemplate: React.FC<AddTemplateProps> = ({ csrfToken, history }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', constants.VALIDATION_ERROR_TITLE);

    const [template, dispatch] = React.useReducer<Reducer<Template, InputEventData>>(reducer, {});

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

    const onSelectedCaseTypeChange = useCallback((selectedCaseType: Item) => {
        dispatch({ name: 'caseType', value: selectedCaseType });
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, template, addFormError)) {

            const data = new FormData();
            data.append('file', template.files![0]);
            data.append('caseType', template.caseType!.value);

            addTemplate(data).then(() => {
                history.push('/', { successMessage: constants.ADD_TEMPLATE_SUCCESS });
            }).catch((error: any) => {
                setErrorMessage(new ErrorMessage(constants.ADD_TEMPLATE_ERROR_DESCRIPTION, constants.GENERAL_ERROR_TITLE));
            });
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <Link to="/" className="govuk-back-link">Back</Link>
                    <ErrorSummary pageError={pageError} />
                    <h1 className="govuk-heading-xl">
                        Add a Template
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
                            onSelectedItemChange={onSelectedCaseTypeChange}
                            value={template.caseType}
                        />
                        <DocumentAdd
                            name="files"
                            updateState={dispatch}
                        />
                        <Submit />
                    </form>
                </div>
            </div>
        </>
    );
};

const WrappedAddTemplate = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <AddTemplate csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddTemplate;
