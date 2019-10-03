import types from './types';

export interface ContextAction<T> {
    type: string;
    payload?: T;
}

export type ActionFunctionAny<R> = (...args: any[]) => R;

function createAction<Payload>(actionType: string): ActionFunctionAny<ContextAction<any>> {
    return (payload: Payload) => ({
        payload,
        type: actionType
    });
}

export const unsetError = createAction(types.UNSET_ERROR);

export const clearApiStatus = createAction(types.CLEAR_API_STATUS);

export const updateApiStatus = createAction(types.UPDATE_API_STATUS);
