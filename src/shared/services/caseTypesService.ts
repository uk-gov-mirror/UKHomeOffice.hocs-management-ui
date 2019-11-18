import axios from 'axios';
import CaseType from '../models/caseType';
import Item from '../models/item';
import TemplateMeta from '../models/templateMeta';

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

export const getTemplatesForCaseType = (caseTypeId: string) => new Promise<Item[]>((resolve, reject) =>
    axios.get<TemplateMeta[]>(`/api/case-types/${caseTypeId}/templates`)
        .then((response) => {
            resolve(response.data.map(({ displayName, uuid }) => ({ label: displayName, value: uuid })).sort(sortByLabel));
        })
        .catch(error => reject(error))
);
