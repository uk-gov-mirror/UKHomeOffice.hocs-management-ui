import Item from './item';

export default interface InputEventData {
    name: string;
    value: string | File[] | Item;
}
