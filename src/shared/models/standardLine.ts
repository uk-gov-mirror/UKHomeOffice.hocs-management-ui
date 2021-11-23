import Item from './item';

export default interface StandardLine {
    expiryDate: string;
    files?: File[];
    topic?: Item;
}
