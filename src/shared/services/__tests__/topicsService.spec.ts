import axios from 'axios';
import { getParentTopics } from '../topicsService';
import Item from '../../models/item';

jest.mock('axios');

const axiosGetSpy: jest.SpyInstance = jest.spyOn(axios, 'get');

beforeEach(() => {
    jest.resetAllMocks();
});
describe('when the getParentTopics method is called', () => {

    beforeEach(() => {
        axiosGetSpy.mockReturnValue(Promise.resolve({
            data: [
                { label: '__parentTopic1__', value: '__parentTopicId1__' },
                { label: '__parentTopic2__', value: '__parentTopicId2__' }
            ]
        }));
    });
    describe('and the request is sucessful', () => {
        it('should return a resolved promise with the parentTopics collection', async () => {
            expect.assertions(2);

            await getParentTopics().then((payload: Item[]) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(payload).toStrictEqual([
                    { label: '__parentTopic1__', value: '__parentTopicId1__' },
                    { label: '__parentTopic2__', value: '__parentTopicId2__' }
                ]);
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a rejected promise', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(2);

            await getParentTopics().catch((error: Error) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(error.message).toEqual('__error__');
            });
        });
    });
});