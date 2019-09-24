import { reducer } from '../reducer';
import { InputEventData } from '../../../common/components/forms/text';
import { initialState } from '../initialState';

describe('when a new state key value pair is received', () => {
    it('will be merged into the state', () => {

        const eventData: InputEventData = { name: 'displayName', value: '__testValue__' };
        const { unit: initialUnit, ...initialOtherState } = initialState;
        const { unit, ...otherState } = reducer(initialState, { type: 'SetUnitValues', payload: eventData });
        expect(unit).toStrictEqual({ displayName: '__testValue__', shortCode: '' });
        expect(otherState).toStrictEqual(initialOtherState);
    });
});
