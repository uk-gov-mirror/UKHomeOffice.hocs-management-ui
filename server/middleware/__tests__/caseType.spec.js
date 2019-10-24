import {createHeaders} from "../../models/user";

jest.mock('../../clients/index');
jest.mock('../../libs/logger');
jest.mock('../../models/user');
const { infoService } = require('../../clients/index');
const { getCaseTypes } = require('../caseType');
const getLogger = require('../../libs/logger');

describe('When the CaseType middleware getCaseTypes method is called', () => {

    const headers = '__headers__';
    const req = { user: '__user__' };
    const sendStatus = jest.fn();
    const res = { locals: {}, sendStatus };
    const next = jest.fn();
    const caseTypes = [{ label: 'Case Type 1', value: 'caseType1' }, { label: 'Case Type 2', value: 'caseType2' }];

    beforeEach(() => {
        next.mockReset();
        sendStatus.mockReset();
    });

    describe('and the call is successful', () => {
        beforeEach(() => {
            infoService.get.mockImplementation(() => Promise.resolve({ data: caseTypes }));
        });

        it('should call the get method on the info service', async () => {
            createHeaders.mockImplementation(() => headers);
            await getCaseTypes(req, res, next);
            expect(infoService.get).toHaveBeenCalledWith('/caseType', { headers: headers });
            expect(res.locals.caseTypes).toStrictEqual(caseTypes);
        });

        it('should call the user create headers method', async () => {
            await getCaseTypes(req, res, next);
            expect(createHeaders).toHaveBeenCalled();
        });

        it('should get the logger instance', async () => {
            await getCaseTypes(req, res, next);
            expect(getLogger).toHaveBeenCalled();
        });
    });

    describe('and the request fails', () => {
        const logError = jest.fn();
        beforeEach(async () => {
            infoService.get.mockImplementation(() => Promise.reject('__error__'));
            getLogger.mockImplementation(() => ({ error: logError }));
            await getCaseTypes(req, res, next);

        });
        it('should log when the request fails', async () => {
            expect(logError).toHaveBeenCalled();
        });
        it('should call the next handler', async () => {
            expect(next).toHaveBeenCalledWith('__error__');
        });
    });
});
