import { FormError } from './formError';

export default interface PageError {
    error?: {
        formErrors?: FormError[];
        description?: string;
        title?: string;
    };
}
