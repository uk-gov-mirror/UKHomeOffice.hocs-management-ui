import Item from "../../../models/item";
import Team from "../../../models/team";

export interface State {
    topic: Item;
    privateMinisterTeam: Team;
    draftQaTeam: Team;
}
