export const createMockFile = (name: string = 'mock.docx', size: number = 1024, mimeType: string = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') => {
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
