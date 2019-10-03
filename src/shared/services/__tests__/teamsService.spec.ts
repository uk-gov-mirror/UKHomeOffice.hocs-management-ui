import axios from 'axios';
import { getTeam, getTeams, getTeamMembers } from '../teamsService';
import Team from '../../models/team';
import { User } from '../../models/user';
import Item from '../../models/item';

jest.mock('axios');

let axiosGetSpy: jest.SpyInstance;

beforeEach(() => {
    jest.resetAllMocks();
    axiosGetSpy = jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({
        data: [
            { label: '__user1__', value: '__userId1__' },
            { label: '__user2__', value: '__userId2__' }
        ]
    }));
});

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
        it('should return a rejected promise', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(1);

            await getTeam('__teamId__').catch((error: Error) => {
                expect(error.message).toEqual('__error__');
            });
        });
    });
});

describe('when the getTeamMembers method is called', () => {
    describe('and the request is sucessful', () => {
        it('should return a resolved promise with the users collection', async () => {
            expect.assertions(2);

            await getTeamMembers('__teamId__').then((payload: User[]) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(payload).toStrictEqual([
                    { label: '__user1__', value: '__userId1__' },
                    { label: '__user2__', value: '__userId2__' }
                ]);
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a rejected promise', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(2);

            await getTeamMembers('__teamId__').catch((error: Error) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(error.message).toEqual('__error__');
            });
        });
    });
});

describe('when the getTeams method is called', () => {

    beforeEach(() => {
        axiosGetSpy.mockReturnValue(Promise.resolve({
            data: [
                { label: '__team1__', value: '__teamId1__' },
                { label: '__team2__', value: '__teamId2__' }
            ]
        }));
    });
    describe('and the request is sucessful', () => {
        it('should return a resolved promise with the teams collection', async () => {
            expect.assertions(2);

            await getTeams().then((payload: Item[]) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(payload).toStrictEqual([
                    { label: '__team1__', value: '__teamId1__' },
                    { label: '__team2__', value: '__teamId2__' }
                ]);
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a rejected promise', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(2);

            await getTeams().catch((error: Error) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(error.message).toEqual('__error__');
            });
        });
    });
});
