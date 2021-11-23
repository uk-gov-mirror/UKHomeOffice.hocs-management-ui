import StandardLineModel from '../../models/standardLineModel';

export interface State {
    activeStandardLines: StandardLineModel[];
    allStandardLines: StandardLineModel[];
    standardLinesLoaded: boolean;
    filter: string;
    excludeExpired: boolean;
}
