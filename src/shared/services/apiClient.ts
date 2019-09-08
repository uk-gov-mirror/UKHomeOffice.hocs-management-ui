import axios from 'axios';

export default {
    createClient: () => {
        const client = axios.create();

        return {
            get: client.get,
            delete: client.delete,
            post: client.post,
            put: client.put
        };
    }
};
