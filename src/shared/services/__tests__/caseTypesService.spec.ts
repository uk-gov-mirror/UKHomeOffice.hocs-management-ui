import axios from 'axios';
import { getCaseType, getCaseTypes, getTemplatesForCaseType } from '../caseTypesService';
import CaseType from '../../models/caseType';
import Item from 'shared/models/item';

jest.mock('axios');

describe('when the getCaseType method is called', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({
            data: {
                label: '__label1__',
                value: '__value1__',
                displayName: '__displayName1__',
                shortCode: '__shortCode1__',
                type: '__type1__'
            }
        }));
    });
    describe('and the request is successful', () => {
        it('should return a resolved promise with the templates collection', async () => {
            expect.assertions(2);

            await getCaseType('__caseTypeType__').then((payload: CaseType) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(payload).toStrictEqual({
                    label: '__label1__',
                    value: '__value1__',
                    displayName: '__displayName1__',
                    shortCode: '__shortCode1__',
                    type: '__type1__'
                });
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

describe('when the getCaseTypes method is called', () => {
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
    describe('and the request is successful', () => {
        it('should return a resolved promise with the templates collection', async () => {
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

describe('when the getTemplatesForCaseType method is called', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({
            data: [{
                caseType: '__caseType1__',
                displayName: '__displayName2__',
                documentUUID: '__documentUUID2__',
                uuid: '__uuid2__'
            },
            {
                caseType: '__caseType1__',
                displayName: '__displayName1__',
                documentUUID: '__documentUUID1__',
                uuid: '__uuid1__'
            }]
        }));
    });
    describe('and the request is successful', () => {
        it('should return a resolved promise with the users collection', async () => {
            expect.assertions(2);
            const caseType = '__caseType__';
            await getTemplatesForCaseType(caseType).then((payload: Item[]) => {
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(payload).toStrictEqual([
                    {
                        label: '__displayName1__',
                        value: '__uuid1__'
                    },
                    {
                        label: '__displayName2__',
                        value: '__uuid2__'
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
