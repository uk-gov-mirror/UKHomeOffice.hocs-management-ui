import React, { Fragment } from 'react';

const Dashboard: React.FC = () => (
    <Fragment>
        <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
                <h2 className="govuk-heading-l">Choose an area to manage</h2>
                <ol className="govuk-list">
                    <li>
                        <h3 className="govuk-heading-m">
                            Team Management
                        </h3>
                        <ul className="govuk-list">
                            <li>
                                <a className="govuk-link" href="/team_search">Add/Remove Users</a>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    </Fragment>
);

export default Dashboard;
