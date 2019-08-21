import React, { Fragment } from 'react';

const Dashboard : React.FC = () => (
  <Fragment>
      <div className="govuk-grid-column-two-thirds">
          <ul className="govuk-list">
              <li>
                  <a className="govuk-link" href="/team_search">Add/Remove Users</a>
              </li>
          </ul>
      </div>
  </Fragment>
);

export default Dashboard;
