import axios from 'axios';
import { getCaseTypes } from '../caseTypesService';
import CaseType from '../../models/caseType';

jest.mock('axios');

beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({
        data: [
            {
                label: '__label1__',
                value: '__value1__',
                displayName: '__displayName1__',
                shortCode: '__shortCode1__',
                type: '__type1__'
            },
            {
                label: '__label2__',
                value: '__value2__',
                displayName: '__displayName2__',
                shortCode: '__shortCode2__',
                type: '__type2__'
            }
        ]
    }));
});

describe('when the getCaseTypes method is called', () => {
    describe('and the request is successful', () => {
        it('should return a resolved promise with the users collection', async () => {
            expect.assertions(2);

            await getCaseTypes().then((payload: CaseType[]) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(payload).toStrictEqual([
                    {
                        label: '__label1__',
                        value: '__value1__',
                        displayName: '__displayName1__',
                        shortCode: '__shortCode1__',
                        type: '__type1__'
                    },
                    {
                        label: '__label2__',
                        value: '__value2__',
                        displayName: '__displayName2__',
                        shortCode: '__shortCode2__',
                        type: '__type2__'
                    }
                ]);
            });
        });
    });

    describe('and the request fails', () => {
        it('should return a resolved promise with the team object', async () => {
            jest.spyOn(axios, 'get').mockReturnValue(Promise.reject(new Error('__error__')));
            expect.assertions(2);

            await getCaseTypes().catch((error: Error) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(error.message).toEqual('__error__');
            });
        });
    });
});
