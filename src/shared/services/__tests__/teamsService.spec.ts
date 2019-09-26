import axios from 'axios';
import { getTeam } from '../teamsService';
import Team from '../../models/team';

jest.mock('axios');

describe('when the getTeam method is called', () => {
    describe('and the request is sucessful', () => {
        it('should return a resolved promise with the team object', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({ data: { displayName: '__displayName__' } }));
            expect.assertions(1);

            await getTeam('__teamId__').then((payload: Team) => {
                expect(payload).toStrictEqual({ displayName: '__displayName__' });
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a resolved promise with the team object', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(1);

            await getTeam('__teamId__').catch((error: Error) => {
                expect(error.message).toEqual('__error__');
            });
        });
    });
});
