import { initialState } from '../initialState';
import { reducer } from '../reducer';
import { ADD_USER_ERROR_DESCRIPTION, ADD_USER_ERROR_TITLE, EMPTY_SUBMIT_ERROR_DESCRIPTION, EMPTY_SUBMIT_ERROR_TITLE } from '../../../../models/constants';

describe('when an action is dispatched', () => {
    describe('and it is an AddError action', () => {
        it('will add the error to the state', () => {

            const { errorDescription: initialErrorDescription, errorTitle: initialErrorTitle, errors: initialErrors, ...initialOtherState } = initialState;
            const state = reducer(initialState, { type: 'AddSubmitError', payload: { key: '__key__', value: '__value__' } });
            const { errorDescription, errorTitle, errors, ...otherState } = state;

            expect(errorDescription).toBe(ADD_USER_ERROR_DESCRIPTION);
            expect(errorTitle).toBe(ADD_USER_ERROR_TITLE);
            expect(errors).toHaveLength(1);
            expect(errors![0]).toStrictEqual({ key: '__key__', value: '__value__' });

            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
    describe('and it is an AddToSelection action', () => {
        it('will add the user to the selected users collection', () => {

            const { selectedUsers: initialSelectedUsers, ...initialOtherState } = initialState;
            const state = reducer(initialState, { type: 'AddToSelection', payload: { label: '__label1__', value: '__value1__' } });

            expect(state.selectedUsers).toHaveLength(1);
            expect(state.selectedUsers[0]).toStrictEqual({ label: '__label1__', value: '__value1__' });

            const newState = reducer(state, { type: 'AddToSelection', payload: { label: '__label2__', value: '__value2__' } });
            const { selectedUsers, ...otherState } = newState;

            expect(newState.selectedUsers).toHaveLength(2);
            expect(newState.selectedUsers[0]).toStrictEqual({ label: '__label1__', value: '__value1__' });
            expect(newState.selectedUsers[1]).toStrictEqual({ label: '__label2__', value: '__value2__' });

            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
    describe('and it is a BeginSubmit action', () => {
        it('will clear any previous errors', () => {

            const { errors: initialErrors, ...initialOtherState } = initialState;
            const state = reducer(initialState, { type: 'BeginSubmit' });
            const { errors, ...otherState } = state;

            expect(errors).toBeUndefined();
            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
    describe('and it is a ClearSelectedUser action', () => {
        it('will clear any previous errors', () => {

            const { selectedUser: initialSelectedUser, ...initialOtherState } = initialState;
            const state = reducer(initialState, { type: 'ClearSelectedUser' });
            const { selectedUser, ...otherState } = state;

            expect(selectedUser).toBe('');
            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
    describe('and it is a PopulateUsers action', () => {
        it('will clear any previous errors', () => {

            const { users: initialUsers, ...otherInitialState } = initialState;
            const state = reducer(initialState, {
                type: 'PopulateUsers', payload: [
                    { label: '__user1__', value: '__userId1__' },
                    { label: '__user2__', value: '__userId2__' }
                ]
            });
            const { users, ...otherState } = state;

            expect(users).toStrictEqual([{ label: '__user1__', value: '__userId1__' }, { label: '__user2__', value: '__userId2__' }]);
            expect(otherState).toStrictEqual(otherInitialState);
        });
    });
    describe('and it is an RemoveFromSelection action', () => {
        it('will remove the user from the selected users collection', () => {

            initialState.selectedUsers = [{ label: '__label1__', value: '__value1__' }, { label: '__label2__', value: '__value2__' }];
            const { selectedUsers: initialSelectedUsers, ...initialOtherState } = initialState;

            const state = reducer(initialState, { type: 'RemoveFromSelection', payload: { label: '__label1__', value: '__value1__' } });
            const { selectedUsers, ...otherState } = state;

            expect(state.selectedUsers).toHaveLength(1);
            expect(state.selectedUsers[0]).toStrictEqual({ label: '__label2__', value: '__value2__' });

            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
    describe('and it is an SetGeneralError action', () => {
        it('will add the error to the state', () => {

            const { errorDescription: initialErrorDescription, errorTitle: initialErrorTitle, errors: initialErrors, ...initialOtherState } = initialState;
            const state = reducer(initialState, { type: 'SetGeneralError', payload: { description: EMPTY_SUBMIT_ERROR_DESCRIPTION, title: EMPTY_SUBMIT_ERROR_TITLE } });
            const { errorDescription, errorTitle, errors, ...otherState } = state;

            expect(errorDescription).toBe(EMPTY_SUBMIT_ERROR_DESCRIPTION);
            expect(errorTitle).toBe(EMPTY_SUBMIT_ERROR_TITLE);
            expect(errors).toHaveLength(0);

            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
    describe('and it is a SetTeamName action', () => {
        it('will clear any previous errors', () => {

            const { teamName: initialTeamName, ...initialOtherState } = initialState;
            const state = reducer(initialState, { type: 'SetTeamName', payload: '__teamName__' });
            const { teamName, ...otherState } = state;

            expect(teamName).toBe('__teamName__');
            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
    describe('and it is not handled by the reducer', () => {
        it('will return the original state', () => {

            // @ts-ignore - this case shouldn't be possible unless typescript is ignored or an action is defined without being added to the reducer.
            const state = reducer(initialState, { type: '__unknown__', payload: '__teamName__' });

            expect(state).toStrictEqual(initialState);
        });
    });
});
