import { InputEventData } from '../../common/components/forms/text';
import Unit from '../../models/unit';

export const reducer = (state: Unit, inputEventData: InputEventData) => {
    const newState = { ...state, [inputEventData.name]: inputEventData.value };
    return newState;
};
