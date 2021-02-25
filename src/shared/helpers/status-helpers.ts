import { ErrorContent } from '../layouts/error';

export const hasClientError:(error: (ErrorContent | undefined)) => boolean =
    (error) => error !== undefined && (error.status >= 400 && error.status < 500);
