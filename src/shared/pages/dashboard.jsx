import React, { Fragment, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Context } from '../contexts/application.jsx';
import {
    updateApiStatus,
    unsetForm,
} from '../contexts/actions/index.jsx';
import status from '../helpers/api-status';

const Dashboard = ({ title, match }) => {
    const { dispatch, track, form: contextForm } = useContext(Context);

    const [form, setForm] = useState(contextForm);

    const getPage = () => {
        if (contextForm) {
            dispatch(unsetForm());
            return;
        }
        dispatch(updateApiStatus(status.REQUEST_DASHBOARD_DATA))
            .then(() => axios.get('/api/form'))
            .then(response => setForm(response.data))
            .then(() => dispatch(updateApiStatus(status.REQUEST_DASHBOARD_DATA_SUCCESS)))
            .catch(() => dispatch(updateApiStatus(status.REQUEST_DASHBOARD_DATA_FAILURE)));
    };    

    useEffect(() => {
        if (contextForm) {
            setForm(contextForm);
            dispatch(unsetForm());
        } else {
            getPage();
        }
        track('PAGE_VIEW', { title, path: match.url });
    }, []);

    return form ? (
      <Fragment>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-third'>
            hello world
          </div>
        </div>
      </Fragment>
    ) : 
    ( 
      <div className='govuk-grid-column-one-third'>
        hello world
      </div>
  );
};

Dashboard.propTypes = {
    match: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};

export default Dashboard;