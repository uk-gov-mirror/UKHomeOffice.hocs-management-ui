import { initialState } from '../initialState';
import { reducer } from '../reducer';

describe('when an action is dispatched', () => {
    describe('and it is an SetSelectedTopic action', () => {
        it('will add the topic to the state', () => {

            const {selectedTopic: initialSelectedTopic, ...initialOtherState} = initialState;
            const state = reducer(initialState, {
                type: 'SetSelectedTopic',
                payload: {label: '__label__', value: '__value__'}
            });

            expect(state.selectedTopic).toStrictEqual({label: '__label__', value: '__value__'});

            const newState = reducer(state, {
                type: 'SetSelectedTopic',
                payload: {label: '__label__', value: '__value__'}
            });
            const {selectedTopic, ...otherState} = newState;

            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
});
