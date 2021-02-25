import { hasClientError } from '../../helpers/status-helpers';
import { ErrorContent } from '../../layouts/error';

describe('status-helpers', () => {

    const createErrorContent =
        (status: number) => ( { body: [], location: { pathname: '' }, message: '', stack: '', title: '', status });

    describe('client errors', () => {
        it('should return true for 400', () => {
            const error: ErrorContent = createErrorContent(400);
            expect(hasClientError(error)).toBe(true);
        });

        it('should return true for 499', () => {
            const error: ErrorContent = createErrorContent(400);
            expect(hasClientError(error)).toBe(true);
        });

        it('should return false for 399', () => {
            const error: ErrorContent = createErrorContent(399);
            expect(hasClientError(error)).toBe(false);
        });

        it('should return true false for 500', () => {
            const error: ErrorContent = createErrorContent(500);
            expect(hasClientError(error)).toBe(false);
        });

        it('should return true if no error is present', () => {
            expect(hasClientError(undefined)).toBe(false);
        });
    });
});
