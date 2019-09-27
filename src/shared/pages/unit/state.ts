import { FormError } from '../../models/formError';
import Unit from '../../models/unit';

export interface State {
    errors?: FormError[];
    errorDescription: string;
    errorTitle: string;
    unit: Unit;
}
