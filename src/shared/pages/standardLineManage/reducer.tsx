import { State } from './state';
import { Action } from './actions';
import StandardLineModel from 'shared/models/standardLineModel';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'PopulateStandardLines':
            return { ...state, allStandardLines: action.payload, activeStandardLines: filterLines(action.payload, state.filter.toUpperCase(), state.excludeExpired), standardLinesLoaded: true };
        case 'FilterStandardLines':
            return { ...state, filter: action.payload, activeStandardLines: filterLines(state.allStandardLines, action.payload.toUpperCase(), state.excludeExpired) };
        case 'ExcludeExpiredCheckTrigger':
            return { ...state, excludeExpired: action.payload, activeStandardLines: filterLines(state.allStandardLines, state.filter.toUpperCase(), action.payload) };
    }
    return state;
};

const filterLines = (standardLines: StandardLineModel[], filter: string, excludeExpired: boolean): StandardLineModel[] => {
    let filteredStandardLines = standardLines;
    if (standardLines && filter) {
        filteredStandardLines = [];
        for (let i = 0; i < standardLines.length; i += 1) {
            const standardLine = standardLines[i];
            if (doesFilterMatchValue(standardLine.topic, filter) || doesFilterMatchValue(standardLine.displayName, filter) || doesFilterMatchValue(standardLine.expiryDate, filter)) {
                filteredStandardLines.push(standardLine);
            }
        }
    }
    return excludeExpired ? removeExpiredStarndardLines(filteredStandardLines) : filteredStandardLines;
};

const doesFilterMatchValue = (value: string, filter: string) => {
    return value && filter && value.toUpperCase && value.toUpperCase().indexOf(filter) !== -1;
};

const removeExpiredStarndardLines = (standardLines: StandardLineModel[]): StandardLineModel[] => {
    if (standardLines) {
        const filteredStandardLines = [];
        for (let i = 0; i < standardLines.length; i += 1) {
            const standardLine = standardLines[i];
            if (!standardLine.isExpired) {
                filteredStandardLines.push(standardLine);
            }
        }
        return filteredStandardLines;
    }
    return standardLines;
};
