import axios from 'axios';
import { addStandardLine } from '../standardLinesService';

jest.mock('axios');

beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve());
});

describe('when the createStandardLine method is called', () => {
    describe('and the request is sucessful', () => {
        it('should make an api call and return a resolved promise', async () => {
            expect.assertions(2);

            await addStandardLine({ expiryDate: '2019-10-15T16:17:00.1Z', file: '__file__', topic: '__topicId__' }).then(() => {
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(axios.post).toHaveBeenCalledWith('/api/standard-lines', { expiryDate: '2019-10-15T16:17:00.1Z', file: '__file__', topic: '__topicId__' });
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a resolved promise with the team object', async () => {
            jest.spyOn(axios, 'post').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(2);

            await addStandardLine({ expiryDate: '2019-10-15T16:17:00.1Z', file: '__file__', topic: '__topicId__' }).catch((error: Error) => {
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(error.message).toEqual('__error__');
            });
        });
    });
});
