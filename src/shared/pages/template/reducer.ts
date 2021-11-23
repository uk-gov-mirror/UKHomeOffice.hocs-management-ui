import InputEventData from '../../models/inputEventData';
import Template from '../../models/template';

export const reducer = (state: Template, inputEventData: InputEventData) => {
    const newState = { ...state, [inputEventData.name]: inputEventData.value };
    return newState;
};
