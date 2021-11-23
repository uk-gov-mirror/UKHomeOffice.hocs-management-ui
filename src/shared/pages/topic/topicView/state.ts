import Item from '../../../models/item';

export interface State {
    topic: Item;
    privateMinisterTeam?: Item;
    draftQATeam?: Item;
}
