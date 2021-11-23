import { initialState } from '../initialState';
import { reducer } from '../reducer';

describe('when an action is dispatched', () => {
    describe('and it is a SetDisplayName action', () => {
        it('will clear any previous errors', () => {

            const { displayName: initialDisplayName, ...initialOtherState } = initialState;
            const state = reducer(initialState, { type: 'SetDisplayName', payload: '__displayName__' });
            const { displayName, ...otherState } = state;

            expect(displayName).toBe('__displayName__');
            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
    describe('and it is a SetParentTopic action', () => {
        it('will clear any previous errors', () => {

            const { selectedParentTopic: initialSelectedParentTopic, ...initialOtherState } = initialState;
            const state = reducer(initialState, { type: 'SetSelectedParentTopic', payload: { label: '__label__', value: '__value__' } });
            const { selectedParentTopic, ...otherState } = state;

            expect(selectedParentTopic).toStrictEqual({ label: '__label__', value: '__value__' });
            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
    describe('and it is not handled by the reducer', () => {
        it('will return the original state', () => {

            // @ts-ignore - this case shouldn't be possible unless typescript is ignored or an action is defined without being added to the reducer.
            const state = reducer(initialState, { type: '__unknown__', payload: '__somePayload__' });

            expect(state).toStrictEqual(initialState);
        });
    });
});
