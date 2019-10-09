import Item from "../../../models/item";
import Team from "../../../models/team";

export type SetTopic = {
    payload: Item;
    type: 'SetTopic';
};

export type SetPrivateMinisterTeam = {
    payload: Team;
    type: 'SetPrivateMinisterTeam';
};

export type SetDraftQATeam = {
    payload: Team;
    type: 'SetDraftQATeam';
};

export type Action =
    SetTopic |
    SetPrivateMinisterTeam |
    SetDraftQATeam;
