import { State } from './state';

export const initialState: State = {
    allStandardLines: [],
    activeStandardLines: [],
    standardLinesLoaded: false,
    filter: '',
    excludeExpired: true
};
