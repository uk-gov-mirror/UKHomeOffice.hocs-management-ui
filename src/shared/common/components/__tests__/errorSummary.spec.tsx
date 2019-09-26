import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'enzyme';
import ErrorSummary from '../errorSummary';

const errors = [
    { key: 'Error1', value: 'Error 1' },
    { key: 'Error2', value: 'Error 2' },
    { key: 'Error3', value: 'Error 3' }
];

describe('Form text component', () => {
    it('should render with default props', () => {
        expect(
            render(<ErrorSummary description="Displaying a list of the errors on the page" />)
        ).toMatchSnapshot();
    });
    it('should render with heading when passed', () => {
        expect(
            render(<ErrorSummary description="Displaying a list of the errors on the page" heading="Error summary" />)
        ).toMatchSnapshot();
    });
    it('should render with description when passed', () => {
        expect(
            render(<ErrorSummary description="Displaying a list of the errors on the page" />)
        ).toMatchSnapshot();
    });
    it('should render list of errors when passed', () => {

        expect(
            render(
                < MemoryRouter >
                    <ErrorSummary description="Displaying a list of the errors on the page" errors={errors} />
                </MemoryRouter >
            )
        ).toMatchSnapshot();
    });
});
