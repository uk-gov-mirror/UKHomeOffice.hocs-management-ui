import EntityListItem from '../../../models/entityListItem';

export interface State {
    campaigns: EntityListItem[];
    campaignsLoaded: boolean;
}
