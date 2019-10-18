import axios from 'axios';
import { addStandardLine } from '../standardLinesService';
import { createMockFile } from '../../../../test/createMockFile';

const mockFile = createMockFile();
const standardLine = new FormData();
standardLine.append('expiryDate', '2019-10-15T16:17:00.1Z');
standardLine.append('file', mockFile);
standardLine.append('topic', '__topicId__');

jest.mock('axios');

beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve());
});

describe('when the createStandardLine method is called', () => {
    describe('and the request is sucessful', () => {
        it('should make an api call and return a resolved promise', async () => {
            expect.assertions(2);
            await addStandardLine(standardLine).then(() => {
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(axios.post).toHaveBeenCalledWith('/api/standard-lines', standardLine);
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a resolved promise with the team object', async () => {
            jest.spyOn(axios, 'post').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(2);

            await addStandardLine(standardLine).catch((error: Error) => {
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(error.message).toEqual('__error__');
            });
        });
    });
});
