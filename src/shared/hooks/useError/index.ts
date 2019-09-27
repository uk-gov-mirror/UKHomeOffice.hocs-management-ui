import React, { Reducer } from 'react';
import PageError from '../../models/pageError';
import { Action } from './actions';
import { reducer } from './reducer';
import { FormError } from 'shared/models/formError';

const useError = (): [PageError, (formError: FormError) => void, (title: string) => void, (description: string) => void] => {
    const [pageError, dispatch] = React.useReducer<Reducer<PageError, Action>>(reducer, {});

    const addFormError = (formError: FormError) => dispatch({ type: 'AddFormError', payload: formError });
    const setDescription = (description: string) => dispatch({ type: 'SetDescription', payload: description });
    const setTitle = (title: string) => dispatch({ type: 'SetTitle', payload: title });

    return [pageError, addFormError, setDescription, setTitle];
};

export default useError;
