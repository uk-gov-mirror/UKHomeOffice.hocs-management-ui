import axios from 'axios';
import { getUsers, getTeamMembers, addUserToTeam, AddUserError, deleteUserFromTeam } from '../usersService';
import { User } from '../../models/user';

jest.mock('axios');

beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({
        data: [
            { label: '__user1__', value: '__userId1__' },
            { label: '__user2__', value: '__userId2__' }
        ]
    }));
    jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve({
        data: { label: '__user1__', value: '__userId1__' }
    }));
    jest.spyOn(axios, 'delete').mockReturnValue(Promise.resolve({
        data: { label: '__user1__', value: '__userId1__' }
    }));
});

describe('when the getUsers method is called', () => {
    describe('and the request is sucessful', () => {
        it('should return a resolved promise with the users collection', async () => {
            expect.assertions(2);

            await getUsers().then((payload: User[]) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(payload).toStrictEqual([
                    { label: '__user1__', value: '__userId1__' },
                    { label: '__user2__', value: '__userId2__' }
                ]);
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a resolved promise with the team object', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(2);

            await getUsers().catch((error: Error) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
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
        it('should return a resolved promise with the team object', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(2);

            await getTeamMembers('__teamId__').catch((error: Error) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(error.message).toEqual('__error__');
            });
        });
    });
});

describe('when the addUserToTeam method is called', () => {
    describe('and the request is sucessful', () => {
        it('should return a resolved promise with the users collection', async () => {
            expect.assertions(2);

            await addUserToTeam({ label: '__user1__', value: '__userId1__' }, '__teamId__').then((payload: User[]) => {
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(payload).toStrictEqual({ label: '__user1__', value: '__userId1__' });
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a resolved promise with the team object', async () => {
            jest.spyOn(axios, 'post').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(3);

            await addUserToTeam({ label: '__user1__', value: '__userId1__' }, '__teamId__').catch((error: AddUserError) => {
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(error.message).toEqual('__error__');
                expect(error.userToAdd).toStrictEqual({ label: '__user1__', value: '__userId1__' });
            });
        });
    });
});

describe('when the deleteUserFromTeam method is called', () => {
    describe('and the request is sucessful', () => {
        it('should return a resolved promise with the users collection', async () => {
            expect.assertions(2);

            await deleteUserFromTeam('__userId1__', '__teamId__').then((payload: User[]) => {
                expect(axios.delete).toHaveBeenCalledTimes(1);
                expect(payload).toStrictEqual({ label: '__user1__', value: '__userId1__' });
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a resolved promise with the team object', async () => {
            jest.spyOn(axios, 'delete').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(2);

            await deleteUserFromTeam('__userId1__', '__teamId__').catch((error: AddUserError) => {
                expect(axios.delete).toHaveBeenCalledTimes(1);
                expect(error.message).toEqual('__error__');
            });
        });
    });
});
