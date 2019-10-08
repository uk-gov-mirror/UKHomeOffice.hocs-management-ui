import { initialState } from '../initialState';
import { reducer } from '../reducer';

describe('when an action is dispatched', () => {
    describe('and it is a SetTeamName action', () => {
        it('it will set the team name in state', () => {

            const { teamUUID: initialTeamName, ...initialOtherState } = initialState;
            const state = reducer(initialState, { type: 'AddTeamUUID', payload: '__teamName__' });
            const { teamUUID, ...otherState } = state;

            expect(teamUUID).toBe('__teamName__');
            expect(otherState).toStrictEqual(initialOtherState);
        });
    });
});
