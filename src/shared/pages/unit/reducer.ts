import Unit from '../../models/unit';
import InputEventData from '../../models/inputEventData';

export const reducer = (state: Unit, inputEventData: InputEventData) => {
    const newState = { ...state, [inputEventData.name]: inputEventData.value };
    return newState;
};
