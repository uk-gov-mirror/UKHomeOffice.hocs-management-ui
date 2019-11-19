import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { getCaseType, getTemplatesForCaseType } from '../../services/caseTypesService';
import Item from '../../models/item';
import * as constants from '../../models/constants';
import ErrorSummary from '../../common/components/errorSummary';
import ErrorMessage from '../../models/errorMessage';
import useError from '../../hooks/useError';
import { Link } from 'react-router-dom';
import CaseType from 'shared/models/caseType';

interface MatchParams {
    type: string;
}

interface CasesProps extends RouteComponentProps<MatchParams> { }

const onAddTemplateClick = (history: History, type: string) => {
    history.push(`/case-type/${type}/add-template`);
};

const TeamView: React.FC<CasesProps> = ({ history, match }) => {

    const [pageError, , , setErrorMessage] = useError();
    const [caseType, setCaseType] = React.useState<CaseType>();
    const [templates, setTemplates] = React.useState<Item[]>();
    const { params: { type } } = match;

    useEffect(() => {
        getCaseType(type)
            .then(setCaseType)
            .catch(() => {
                setErrorMessage(new ErrorMessage(constants.LOAD_CASE_TYPE_ERROR_DESCRIPTION, constants.GENERAL_ERROR_TITLE));
            });
        getTemplatesForCaseType(type)
            .then(setTemplates)
            .catch(() => {
                setErrorMessage(new ErrorMessage(constants.LOAD_TEMPLATES_ERROR_DESCRIPTION, constants.GENERAL_ERROR_TITLE));
            });
    }, []);

    return (
        <div className="govuk-form-group">
            <Link to="/case-types" className="govuk-back-link">Back</Link>
            <ErrorSummary
                pageError={pageError}
            />
            <div>
                <h1 className="govuk-heading-xl">View and remove templates</h1>
                <h2 className="govuk-heading-l">
                    {caseType && `Case Type: ${caseType.displayName}`}
                </h2>
                {
                    templates ?
                        <div>
                            <table className="govuk-table">
                                <thead className="govuk-table__head">
                                    <tr className="govuk-table__row">
                                        <th className="govuk-table__header" scope="col">Team members</th>
                                        <th className="govuk-table__header" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="govuk-table__body">
                                    {
                                        templates.map((template) => {
                                            return (
                                                <tr className="govuk-table__row" key={template.value}>
                                                    <td className="govuk-table__cell">{template.label}</td>
                                                    <td className="govuk-table__cell">

                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> :
                        <div>
                            <p className="govuk-body">Loading...</p>
                        </div>
                }
                <button
                    type="submit"
                    className="govuk-button govuk-!-margin-right-1 add-team-members-button"
                    data-module="govuk-button"
                    onClick={() => onAddTemplateClick(history, type)}
                >
                    Add template
                </button>
            </div>
        </div>
    );
};

export default TeamView;
