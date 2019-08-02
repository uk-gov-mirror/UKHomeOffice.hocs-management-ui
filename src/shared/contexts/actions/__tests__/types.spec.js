import ActionTypes from '../types.ts';

describe('Action types', () => {
    it('should export an object containing action types', () => {
        expect(typeof ActionTypes).toEqual('object');
    });
});