import axios from 'axios';
import { getTopics } from '../topicService';
import Topic from '../../models/topic';

jest.mock('axios');

describe('when the getTopics method is called', () => {
    describe('and the request is successful', () => {
        it('should return a resolved promise with the topics object', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({ data: { displayName: '__displayName__' } }));
            expect.assertions(1);

            await getTopics().then((payload: Topic[]) => {
                expect(payload).toStrictEqual({ displayName: '__displayName__' });
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a resolved promise with the topic object', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(1);

            await getTopics().catch((error: Error) => {
                expect(error.message).toEqual('__error__');
            });
        });
    });
});
