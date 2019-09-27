import { FormError } from '../../models/formError';

export type AddFormError = {
    payload: FormError;
    type: 'AddFormError';
};

export type ClearError = {
    type: 'ClearError'
};

export type SetTitle = {
    payload: string;
    type: 'SetTitle';
};

export type SetDescription = {
    payload: string;
    type: 'SetDescription';
};

export type Action =
    AddFormError |
    ClearError |
    SetDescription |
    SetTitle;
