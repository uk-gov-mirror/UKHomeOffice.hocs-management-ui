import React, { useEffect, useState } from 'react';
import { History } from 'history';
import ErrorSummary from '../../../common/components/errorSummary';
import useError from '../../../hooks/useError';
import { Link } from 'react-router-dom';
import { getUnits } from '../../../services/unitsService';
import Unit from 'shared/models/unit';

interface UnitSearchProps {
    history: History;
}

const UnitSearch: React.FC<UnitSearchProps> = ({ history }) => {

    const [pageError] = useError();
    const [units, setUnit] = useState<Unit[]>();

    useEffect(() => {
        getUnits()
            .then(choices => setUnit(choices));
    }, []);

    return (
        <div className="govuk-form-group">
            <Link className="govuk-back-link" to="/">Back</Link>
            <ErrorSummary pageError={pageError} />
            <h1 className="govuk-heading-xl">Unit List</h1>
            <table className="govuk-table">
                <caption className="govuk-table__caption">Units</caption>
                <tbody className="govuk-table__body">
                {units && units.map(unit => (
                    <tr key={unit.shortCode} className="govuk-table__row">
                        <th scope="row" className="govuk-table__header">
                            {unit.displayName}
                        </th>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UnitSearch;
