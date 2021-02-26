import { object, string } from 'yup';
import React, { useContext, useState } from 'react';
import { validate } from '../../../validation';
import ErrorMessage from '../../../models/errorMessage';
import {
    ADD_NOMINATED_CONTACT_ERROR_DESCRIPTION,
    DUPLICATE_NOMINATED_CONTACT_DESCRIPTION, GENERAL_ERROR_TITLE, VALIDATION_ERROR_TITLE
} from '../../../models/constants';
import { addNominatedContact } from '../../../services/nominatedContactsService';
import Text from '../../../common/components/forms/text';
import Submit from '../../../common/components/forms/submit';
import { Context } from '../../../contexts/application';
// @ts-ignore
import { ContactsContext } from './contactsContext';

interface MatchParams {
    teamId: string;
    errorFuncs: any;
}

const validationSchema = object({
    inputValue: string()
        .required()
        .label('email address')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
});

const AddNominatedContact: React.FC<MatchParams> = ({ teamId, errorFuncs }) => {
    const { dispatch } = useContext(ContactsContext);

    const { csrf: csrfToken } = React.useContext(Context);
    const [, addFormError, clearErrors, setErrorMessage] = errorFuncs;
    const [emailAddressInput, setEmailAddressInput] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        if (validate(validationSchema, { inputValue: emailAddressInput }, addFormError)) {
            addNominatedContact({
                emailAddress: emailAddressInput,
                teamUUID: teamId
            }).then((data: { uuid: string }) => {
                dispatch({ type: 'AddContact', payload: { value: data.uuid, label: emailAddressInput } });
                setEmailAddressInput('');
            })
                .catch((error) => {
                    if (error && error.response && error.response.status === 409) {
                        setErrorMessage(new ErrorMessage(DUPLICATE_NOMINATED_CONTACT_DESCRIPTION, VALIDATION_ERROR_TITLE));
                    } else {
                        setErrorMessage(new ErrorMessage(ADD_NOMINATED_CONTACT_ERROR_DESCRIPTION, GENERAL_ERROR_TITLE));
                    }
                });
        }
    };

    return (<div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half-from-desktop">
            <form method="POST" onSubmit={handleSubmit}>
                <input type="hidden" name="_csrf" value={csrfToken} />
                <Text
                    label="Email Address"
                    name="emailAddress"
                    type="text"
                    updateState={({ value }) => setEmailAddressInput((value as string))}
                    value={emailAddressInput}
                />
                <Submit label = 'Add nominated contact'/>
            </form>
        </div>
    </div>);
};

export default AddNominatedContact;
