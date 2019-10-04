import { infoService } from '../../clients/index';
import getLogger from '../../libs/logger';
import { createHeaders } from '../../models/user';
import { addTopic, getParentTopics, returnParentTopicsJson } from '../topic';

jest.mock('../../clients/index');
jest.mock('../../libs/logger');
jest.mock('../../models/user');

describe('When the Topic middleware getParentTopics method is called', () => {

    const headers = '__headers__';
    const req = { user: '__user__' };
    const sendStatus = jest.fn();
    const res = { locals: {}, sendStatus };
    const next = jest.fn();
    const mockParentTopics = [{ label: 'Parent Topic 1', value: 'parentTopic1' }, { label: 'Parent Topic 2', value: 'parentTopic2' }];

    beforeEach(() => {
        next.mockReset();
        sendStatus.mockReset();
    });

    describe('and the call is sucessful', () => {
        beforeEach(() => {
            infoService.get.mockImplementation(() => Promise.resolve({ data: mockParentTopics }));
        });

        it('should call the post method on the info service', async () => {
            createHeaders.mockImplementation(() => headers)
            await getParentTopics(req, res, next);
            expect(infoService.get).toHaveBeenCalledWith('/topic/parents', { headers: headers });
            expect(res.locals.parentTopics).toStrictEqual(mockParentTopics);
        });

        it('should call the user create headers method', async () => {
            await getParentTopics(req, res, next);
            expect(createHeaders).toHaveBeenCalled();
        });

        it('should get the logger instance', async () => {
            await getParentTopics(req, res, next);
            expect(getLogger).toHaveBeenCalled();
        });
    });

    describe('and the request fails', () => {
        const logError = jest.fn();
        beforeEach(async () => {
            infoService.get.mockImplementation(() => Promise.reject('__error__'));
            getLogger.mockImplementation(() => ({ error: logError }));
            await getParentTopics(req, res, next);

        })
        it('should log when the request fails', async () => {
            expect(logError).toHaveBeenCalled();
        });
        it('should call the next handler', async () => {
            expect(next).toHaveBeenCalledWith('__error__');
        });
    });
});

describe('when the json handler is called', () => {
    const req = {};
    let res = {};
    const next = jest.fn();
    const json = jest.fn();
    const parentTopics = ['parentTopic1', 'parentTopic2', 'parentTopic3'];

    beforeEach(() => {
        next.mockReset();
        res = { json, locals: { parentTopics } };
    });

    it('should return the parentTopics as json', async () => {
        await returnParentTopicsJson(req, res, next);
        expect(json).toHaveBeenCalledWith(parentTopics);
    });

    it('should be the last handler', async () => {
        await returnParentTopicsJson(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
});

describe('Topic middleware addTopic', () => {

    const headers = '__headers__';
    const topicToCreate = { displayName: '__displayName__' }
    const req = { params: { parentTopicId: '__parentTopicId__' }, body: topicToCreate, user: '__user__' };
    const sendStatus = jest.fn();
    const res = { sendStatus };
    const next = jest.fn();

    beforeEach(() => {
        next.mockReset();
        sendStatus.mockReset();
    });

    it('should call the post method on the info service', async () => {
        createHeaders.mockImplementation(() => headers)
        await addTopic(req, res, next);
        expect(infoService.post).toHaveBeenCalledWith('/topic/parent/__parentTopicId__', topicToCreate, { headers: headers });
    });

    it('should call the user create headers method', async () => {
        await addTopic(req, res, next);
        expect(createHeaders).toHaveBeenCalled();
    });

    it('should call the sendstatus method with a success code', async () => {
        await addTopic(req, res, next);
        expect(sendStatus).toHaveBeenCalledWith(200);
    });

    it('should get the logger instance', async () => {
        await addTopic(req, res, next);
        expect(getLogger).toHaveBeenCalled();
    });

    it('should log when the request fails', async () => {
        infoService.post.mockImplementation(() => Promise.reject('__error__'));
        const logError = jest.fn();
        getLogger.mockImplementation(() => ({ error: logError }));
        await addTopic(req, res, next);
        expect(logError).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith('__error__');
    });
});
