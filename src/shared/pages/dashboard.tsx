
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => (
    <Fragment>
        <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
                <h1 className="govuk-heading-xl">Choose an area to manage</h1>
                <ul className="govuk-list">
                    <li>
                        <h2 className="govuk-heading-l">
                            Standard lines
                        </h2>
                        <ul className="govuk-list govuk-list--bullet">
                            <li>
                                <Link className="govuk-link" to="/add-standard-line">Add a standard line</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h2 className="govuk-heading-l">
                            Team management
                        </h2>
                        <ul className="govuk-list govuk-list--bullet">
                            <li>
                                <Link className="govuk-link" to="/team-search">Manage a team</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h2 className="govuk-heading-l">
                            Template management
                        </h2>
                        <ul className="govuk-list govuk-list--bullet">
                            <li>
                                <Link className="govuk-link" to="/case-types">Manage templates</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h2 className="govuk-heading-l">
                            Topic management
                        </h2>
                        <ul className="govuk-list govuk-list--bullet">
                            <li>
                                <Link className="govuk-link" to="/add-child-topic">Add child topic</Link>
                            </li>
                            <li>
                                <Link className="govuk-link" to="/topic-to-team">Link topic to team</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h2 className="govuk-heading-l">
                            Unit management
                        </h2>
                        <ul className="govuk-list govuk-list--bullet">
                            <li>
                                <Link className="govuk-link" to="/add-unit">Add a unit</Link>
                            </li>
                            <li>
                                <Link className="govuk-link" to="/unit-search">View units and their teams</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </Fragment>
);

export default Dashboard;
