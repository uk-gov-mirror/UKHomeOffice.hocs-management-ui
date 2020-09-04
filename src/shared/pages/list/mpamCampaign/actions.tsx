import EntityListItem from 'shared/models/entityListItem';

export type SetTeamName = {
    type: 'SetTeamName';
    payload?: string;
};

export type PopulateCampaigns = {
    payload: EntityListItem[];
    type: 'PopulateCampaigns';
};

export type Action =
    SetTeamName |
    PopulateCampaigns;
