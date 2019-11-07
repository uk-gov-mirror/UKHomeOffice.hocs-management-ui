import axios from 'axios';
import { addNominatedContact } from '../nominatedContactsService';

jest.mock('axios');

beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve());
});

describe('when the addNominatedContact method is called', () => {
    describe('and the request is successful', () => {
        it('should make an api call and return a resolved promise', async () => {
            expect.assertions(2);

            await addNominatedContact({
                emailAddress: '__emailAddress__', teamName: '__teamName__', teamUUID: '__teamUUID__'})
                .then(() => {
                    expect(axios.post).toHaveBeenCalledTimes(1);
                    expect(axios.post).toHaveBeenCalledWith('/api/nominated-contact', { emailAddress: '__emailAddress__', teamName: '__teamName__', teamUUID: '__teamUUID__' });
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a resolved promise with the team object', async () => {
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
