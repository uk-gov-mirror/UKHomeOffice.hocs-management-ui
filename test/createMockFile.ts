export const createMockFile = (name = 'mock.txt', size = 1024, mimeType = 'plain/txt') => {
    function range(count: number) {
        let output = '';
        for (let i = 0; i < count; i += 1) {
            output += 'a';
        }
        return output;
    }
    const blob = new Blob([range(size)], { type: mimeType });
    const file = new File([blob], name, { type: mimeType, lastModified: new Date().getTime() });
    return file;
};
