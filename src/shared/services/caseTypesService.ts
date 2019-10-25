import axios from 'axios';
import CaseType from '../models/caseType';
import Item from '../models/item';

const sortByLabel: ((a: Item, b: Item) => number) = (a, b) => {
    const labelA = a.label.toLocaleLowerCase();
    const labelB = b.label.toLocaleLowerCase();
    let comparison = 0;
    if (labelA > labelB) {
        comparison = 1;
    } else if (labelA < labelB) {
        comparison = -1;
    }
    return comparison;
};

export const getCaseTypes = () => new Promise<CaseType[]>((resolve, reject) =>
    axios.get('/api/case-types')
        .then((response) => {
            resolve(response.data.sort(sortByLabel));
        })
        .catch(error => reject(error))
);
