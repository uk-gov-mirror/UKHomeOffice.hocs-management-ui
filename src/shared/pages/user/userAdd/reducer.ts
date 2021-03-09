import InputEventData from '../../../models/inputEventData';
import State from './state';

export const reducer = (state: State, inputEventData: InputEventData) => {
    const newState = { ...state, [inputEventData.name]: inputEventData.value };
    return newState;
};
