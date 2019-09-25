import { initialState } from '../initialState';
import { reducer } from '../reducer';


describe('when an action is dispatched', () => {
    describe('and it is a SetTeams action', () => {
        it('it will add teams to the team collection', () => {

            const {teams: initialTeams, teamsLoaded: initialTeamsLoaded, ...otherInitialState} = initialState;
            const state = reducer(initialState, {
                type: 'SetTeams', payload: [
                    {label: '__team1__', value: '__teamId1__'},
                    {label: '__team2__', value: '__teamId2__'}]
            });
            const {teams, teamsLoaded, ...otherState} = state;

            expect(teams).toStrictEqual([
                {label: '__team1__', value: '__teamId1__'},
                {label: '__team2__', value: '__teamId2__'}
            ]);
            expect(teamsLoaded).toEqual(true);
            expect(otherState).toStrictEqual(otherInitialState);
        });
    });
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
