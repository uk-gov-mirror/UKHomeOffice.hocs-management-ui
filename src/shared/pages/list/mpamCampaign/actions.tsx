import EntityListItem from 'shared/models/entityListItem';

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

export type PopulateCampaigns = {
    payload: EntityListItem[];
    type: 'PopulateCampaigns';
};

export type Action =
    SetItemDetails |
    PopulateCampaigns |
    SetTitle |
    SetSimpleName;
