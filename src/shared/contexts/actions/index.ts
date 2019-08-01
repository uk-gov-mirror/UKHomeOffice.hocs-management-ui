import types from './types';

export interface Action<T> {
    type: string;
    payload: T;
}

export type ActionFunctionAny<R> = (...args: any[]) => R;

function createAction<Payload>(actionType: string) : ActionFunctionAny<Action<any>> {
    return (payload: Payload) => ({
        payload,
        type: actionType
    });
}

export const unsetError = createAction(types.UNSET_ERROR);

export const clearApiStatus = createAction(types.CLEAR_API_STATUS);
