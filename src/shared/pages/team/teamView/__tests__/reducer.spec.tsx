import { initialState } from '../initialState';
import { reducer } from '../reducer';


describe('when an action is dispatched', () => {
    describe('and it is a PopulateTeamMembers action', () => {
        it('it will add teams members to the team members collection', () => {

            const {teamMembers: initialUsers, teamMembersLoaded: initialTeamMembers, ...otherInitialState} = initialState;
            const state = reducer(initialState, {
                type: 'PopulateTeamMembers', payload: [
                    {label: '__user1__', value: '__userId1__'},
                    {label: '__user2__', value: '__userId2__'}
                ]
            });
            const {teamMembers, teamMembersLoaded, ...otherState} = state;

            expect(teamMembers).toStrictEqual([
                {label: '__user1__', value: '__userId1__'},
                {label: '__user2__', value: '__userId2__'}
            ]);
            expect(teamMembersLoaded).toEqual(true);
            expect(otherState).toStrictEqual(otherInitialState);
        });
    });
});
