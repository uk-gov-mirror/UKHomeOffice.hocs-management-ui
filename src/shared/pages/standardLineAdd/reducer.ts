import InputEventData from '../../models/inputEventData';
import StandardLine from '../../models/standardLine';

export const reducer = (state: StandardLine, inputEventData: InputEventData) => {
    const newState = { ...state, [inputEventData.name]: inputEventData.value };
    return newState;
};
