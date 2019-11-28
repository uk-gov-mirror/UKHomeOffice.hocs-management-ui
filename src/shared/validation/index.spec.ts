import { checkIfFilesAreCorrectType } from '.';

describe('checkIfFilesAreCorrectType function', () => {
    it(' should return boolean false when file is .txt', () => {
        const fileArray: [File] = [new File([], 'file', { type: 'text/plain' })];

        expect(checkIfFilesAreCorrectType(fileArray)).toEqual(false);
    });

    it(' should return boolean true when file is .docx', () => {
        const fileArray: [File] = [new File([], 'file', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })];

        expect(checkIfFilesAreCorrectType(fileArray)).toEqual(true);
    });
});
