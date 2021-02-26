import axios from 'axios';
import { addNominatedContact, getNominatedContactsForTeam, removeNominatedContactFromTeam } from '../nominatedContactsService';

jest.mock('axios');

describe('nominated contacts service', () => {
    describe('when the addNominatedContact method is called', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve({ data: { uuid: '__uuid__' } } ));
        });

        describe('and the request is successful', () => {
            it('should make an api call and return a resolved promise', async () => {
                expect.assertions(3);

                await addNominatedContact({
                    emailAddress: '__emailAddress__', teamName: '__teamName__', teamUUID: '__teamUUID__'
                })
                    .then((result) => {
                        expect(axios.post).toHaveBeenCalledTimes(1);
                        expect(axios.post).toHaveBeenCalledWith('/api/nominated-contact', { emailAddress: '__emailAddress__', teamName: '__teamName__', teamUUID: '__teamUUID__' });
                        expect(result).toEqual({ 'uuid': '__uuid__' });
                    });
            });
        });

        describe('and the request fails', () => {
            it('should throw an error', async () => {
                jest.spyOn(axios, 'post').mockReturnValue(Promise.reject(new Error('__error__')));
                expect.assertions(2);

                await addNominatedContact({ emailAddress: '__emailAddress__', teamName: '__teamName__', teamUUID: '__teamUUID__' })
                    .catch((error: Error) => {
                        expect(axios.post).toHaveBeenCalledTimes(1);
                        expect(error.message).toEqual('__error__');
                    });
            });
        });
    });

    describe('when the getNominatedContactsForTeam method is called', () => {
        const mockResponse = [
            {
                'id': 1,
                'uuid': '__uuid_1__',
                'teamUUID': '__teamUUID_1__',
                'emailAddress': 'example1@example.org'
            }
        ];

        beforeEach(() => {
            jest.resetAllMocks();
            jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve( { data: mockResponse } ));
        });

        describe('and the request is successful', () => {
            it('should make an api call and return a resolved promise', async () => {
                expect.assertions(3);

                await getNominatedContactsForTeam('__teamUUID__')
                    .then((result) => {
                        expect(axios.get).toHaveBeenCalledTimes(1);
                        expect(axios.get).toHaveBeenCalledWith('/api/nominated-contact/__teamUUID__/');
                        expect(result).toEqual(mockResponse);
                    });
            });
        });

        describe('and the request fails', () => {
            it('should throw an error', async () => {
                jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
                expect.assertions(2);

                await getNominatedContactsForTeam('__teamUUID__')
                    .catch((error: Error) => {
                        expect(axios.get).toHaveBeenCalledTimes(1);
                        expect(error.message).toEqual('__error__');
                    });
            });
        });
    });

    describe('when the removeNominatedContactFromTeam method is called', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            jest.spyOn(axios, 'delete').mockReturnValue(Promise.resolve({ data: {} }));
        });

        describe('and the request is successful', () => {
            it('should make an api call and return a resolved promise', async () => {
                expect.assertions(2);

                await removeNominatedContactFromTeam('__uuid_1__', '__teamUUID__')
                    .then(() => {
                        expect(axios.delete).toHaveBeenCalledTimes(1);
                        expect(axios.delete).toHaveBeenCalledWith('/api/nominated-contact/__uuid_1__/__teamUUID__');
                    });
            });
        });

        describe('and the request fails', () => {
            it('should return a resolved promise with the team object', async () => {
                jest.spyOn(axios, 'delete').mockReturnValue(Promise.reject(new Error('__error__')));
                expect.assertions(2);

                await removeNominatedContactFromTeam('__uuid_1__', '__teamUUID__')
                    .catch((error: Error) => {
                        expect(axios.delete).toHaveBeenCalledTimes(1);
                        expect(error.message).toEqual('__error__');
                    });
            });
        });
    });

});
