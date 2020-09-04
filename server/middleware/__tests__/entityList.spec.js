jest.mock('../../clients/index');
jest.mock('../../libs/logger');
jest.mock('../../models/user');
const { infoService } = require('../../clients/index');
const { getEntityList, returnEntityListJson } = require('../entityList');
const User = require('../../models/user');

describe('returnEntityListJson', () => {
    const req = {};
    let res = {};
    const next = jest.fn();
    const json = jest.fn();
    const entityList = ['entity1', 'entity2', 'entity3'];

    beforeEach(() => {
        next.mockReset();
        res = { json, locals: { entityList } };
    });

    it('should return the users as json', async () => {
        await returnEntityListJson(req, res, next);
        expect(json).toHaveBeenCalledWith(entityList);
    });

    it('should be the last handler', async () => {
        await returnEntityListJson(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
});

describe('getEntityList', () => {

    let req = {};
    let res = {};
    const headers = '__headers__';
    const next = jest.fn();
    const entityList = [{ simpleName: 'entity1', uuid: 'u1', data: { title: 'ent1' } },
    { simpleName: 'entity2', uuid: 'u2', data: { title: 'ent2' } },
    { simpleName: 'entity3', uuid: 'u3', data: { title: 'ent3' } }]

    const expectedResult = [{ simpleName: 'entity1', uuid: 'u1', title: 'ent1' },
    { simpleName: 'entity2', uuid: 'u2', title: 'ent2' },
    { simpleName: 'entity3', uuid: 'u3', title: 'ent3' },]

    beforeEach(() => {
        next.mockReset();
        req = { params: { listName: 'TestListName' } };
        res = { locals: {} };
    });

    it('should put the entityList object in response locals', async () => {
        User.createHeaders.mockImplementation(() => headers)
        infoService.get.mockImplementation(() => Promise.resolve({ data: entityList }));
        await getEntityList(req, res, next);
        expect(infoService.get).toHaveBeenCalledWith(`/entity/list/TestListName`, {}, { headers: headers });
        expect(next).toHaveBeenCalled();
        expect(res.locals.entityList).toBeDefined();
        expect(res.locals.entityList).toEqual(expectedResult);
    });
});