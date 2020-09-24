import EntityListItem from '../../models/entityListItem';
import StandardLineModel from '../../models/standardLineModel';

export type SetItemDetails = {
    type: 'SetItemDetails';
    payload: EntityListItem;
};

export type SetSimpleName = {
    type: 'SetSimpleName';
    payload: string;
};

export type SetTitle = {
    type: 'SetTitle';
    payload: string;
};

export type PopulateStandardLines = {
    payload: StandardLineModel[];
    type: 'PopulateStandardLines';
};

export type FilterStandardLines = {
    payload: string;
    type: 'FilterStandardLines';
};

export type ExcludeExpiredCheckTrigger = {
    payload: boolean;
    type: 'ExcludeExpiredCheckTrigger';
};

export type Action =
    SetItemDetails |
    PopulateStandardLines |
    FilterStandardLines |
    ExcludeExpiredCheckTrigger |
    SetTitle |
    SetSimpleName;
