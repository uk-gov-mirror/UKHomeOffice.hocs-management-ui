import React, { Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import { object, string } from 'yup';
import Submit from '../../common/components/forms/submit';
import Text, { InputEventData } from '../../common/components/forms/text';
import { ApplicationConsumer } from '../../contexts/application';
import { createUnit } from '../../services/unitsService';
import { reducer } from './reducer';
import ErrorSummary from '../../common/components/errorSummary';
import { GENERAL_ERROR_TITLE, ADD_UNIT_ERROR_DESCRIPTION, VALIDATION_ERROR_TITLE, DUPLICATE_UNIT_DESCRIPTION } from '../../models/constants';
import useError from '../../hooks/useError';
import ErrorMessage from '../../models/errorMessage';
import Unit from '../../models/unit';
import { validate } from 'shared/validation';

interface AddUnitProps extends RouteComponentProps {
    csrfToken?: string;
}

const validationSchema = object({
    displayName: string()
        .required()
        .label('Display Name')
        .matches(/^[a-zA-Z0-9_,.!? ()&]*$/),
    shortCode: string()
        .required()
        .label('Short Code')
        .matches(/^[a-zA-Z0-9_,.!? ()&]*$/)
});

const onBackLinkClick = (history: History) => {
    history.push('/');
};

const AddUnit: React.FC<AddUnitProps> = ({ csrfToken, history }) => {

    const [pageError, addFormError, clearErrors, setErrorMessage] = useError('', VALIDATION_ERROR_TITLE);
    const [unit, dispatch] = React.useReducer<Reducer<Unit, InputEventData>>(reducer, {
        displayName: '',
        shortCode: ''
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, unit, addFormError)) {
            createUnit(unit).then(() => {
                history.push('/');
            }).catch((error) => {
                if (error && error.response && error.response.status === 409) {
                    setErrorMessage(new ErrorMessage(DUPLICATE_UNIT_DESCRIPTION, VALIDATION_ERROR_TITLE));
                } else {
                    setErrorMessage(new ErrorMessage(ADD_UNIT_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                }
            });
        }
    };

    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds-from-desktop">
                    <a href="" onClick={() => onBackLinkClick(history)} className="govuk-back-link">Back</a>
                    <ErrorSummary
                        pageError={pageError}
                    />
                    <h1 className="govuk-heading-xl">
                        Add Unit
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                    <form action="/api/units" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="_csrf" value={csrfToken} />
                        <Text
                            label="Display Name"
                            name="displayName"
                            type="text"
                            updateState={({ name, value }) => dispatch({ name, value })}
                            value={unit.displayName}
                        />
                        <Text
                            label="Short Code"
                            name="shortCode"
                            type="text"
                            updateState={({ name, value }) => dispatch({ name, value })}
                            value={unit.shortCode}
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
            <AddUnit csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddUnit;
