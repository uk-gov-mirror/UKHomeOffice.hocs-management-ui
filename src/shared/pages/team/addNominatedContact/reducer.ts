import InputEventData from '../../../models/inputEventData';
import NominatedContact from "../../../models/nominatedContact";

export const reducer = (state: NominatedContact, inputEventData: InputEventData) => {
    const newState = { ...state, [inputEventData.name]: inputEventData.value };
    return newState;
};
