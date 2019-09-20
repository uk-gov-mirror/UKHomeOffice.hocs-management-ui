import React, { useReducer, Reducer } from 'react';
import { RouteComponentProps } from 'react-router';
import Submit from '../../common/components/forms/submit';
import Text, { InputEventData } from '../../common/components/forms/text';
import { ApplicationConsumer } from '../../contexts/application';
import Unit from '../../models/unit';
import { createUnit } from '../../services/unitsService';

interface AddUnitProps extends RouteComponentProps {
    csrfToken?: string;
}

const reducer = (state: Unit, eventData: InputEventData) => {

    const newState = { ...state, [eventData.name]: eventData.value };
    return newState;
};

const AddUnit: React.FC<AddUnitProps> = ({ csrfToken, history }) => {

    const [unit, setUnit] = useReducer<Reducer<Unit, InputEventData>>(reducer, { displayName: '', shortCode: '' });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createUnit(unit).then(() => {
            history.push('/');
        });
    };

    return (
        <div>
            <form action="/api/units" method="POST" onSubmit={handleSubmit}>
                <input type="hidden" name="_csrf" value={csrfToken} />
                <Text
                    label="Display Name"
                    name="displayName"
                    type="text"
                    updateState={setUnit}
                    value={unit.displayName}
                />
                <Text
                    label="Short Code"
                    name="shortCode"
                    type="text"
                    updateState={setUnit}
                    value={unit.shortCode}
                />
                <Submit />
            </form>
        </div>
    );
};

const WrappedAddUnit = ({ history, location, match }: RouteComponentProps) => (
    <ApplicationConsumer>
        {({ csrf }) => (
            <AddUnit csrfToken={csrf} history={history} location={location} match={match} />
        )}
    </ApplicationConsumer>
);

export default WrappedAddUnit;
