import axios from 'axios';
import apiClient from '../apiClient';

const createSpy = jest.spyOn(axios, 'create');

describe('when the API client is created', () => {
    it('should return the client', () => {
        const { delete: del, get, post, put } = apiClient.createClient();

        expect(createSpy).toHaveBeenCalled();
        expect(del).toBeDefined();
        expect(get).toBeDefined();
        expect(post).toBeDefined();
        expect(put).toBeDefined();
    });
});
