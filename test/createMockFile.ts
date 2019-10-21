export const createMockFile = (name: string = 'mock.txt', size: number = 1024, mimeType: string = 'plain/txt') => {
    function range(count: number) {
        let output = '';
        for (let i = 0; i < count; i += 1) {
            output += 'a';
        }
        return output;
    }
    const blob = new Blob([range(size)], { type: mimeType });
    const file = new File([blob], name, { lastModified: new Date().getTime() });
    return file;
};
