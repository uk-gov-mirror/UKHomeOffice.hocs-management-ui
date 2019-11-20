import { ObjectSchema, ValidationError, setLocale, ArraySchema } from 'yup';
import { FormError } from '../models/formError';

setLocale({
    date: {
        min: 'The ${label} must be in the future'
    },
    mixed: {
        required: 'The ${label} is required',
        notType: 'The ${label} is invalid'
    },
    string: {
        matches: 'The ${label} contains invalid characters'
    }
});

export const validate = (schema: ObjectSchema<any> | ArraySchema<any>, state: any, addFormError: (value: FormError) => void) => {
    try {
        schema.validateSync(state, { abortEarly: false });
        return true;
    } catch (error) {
        if (error instanceof ValidationError) {
            error.inner.map(error => addFormError({ key: error.path, value: error.message }));
        }
        return false;
    }
};
