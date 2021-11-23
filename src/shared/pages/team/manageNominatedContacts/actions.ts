import Item from '../../../models/item';
import Team from '../../../models/team';

export type AddContact = {
    payload: Item;
    type: 'AddContact';
};
export type RemoveContact = {
    payload: Item;
    type: 'RemoveContact';
};
export type SetContacts = {
    payload: Array<Item>;
    type: 'SetContacts';
};
export type SetTeam = {
    type: 'SetTeam';
    payload: Team;
};

export type Action =
    AddContact |
    RemoveContact |
    SetContacts |
    SetTeam;
