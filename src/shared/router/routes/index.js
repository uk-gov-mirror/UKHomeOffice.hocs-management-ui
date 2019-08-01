import Error from '../../layouts/error.jsx';
import Dashboard from '../../pages/dashboard.jsx';

const routes = [
    {
        path: '/',
        exact: true,
        component: Dashboard,
        title: 'Dashboard'
    },
    {
        component: Error,
        error: { status: 404 }
    }
];

export default routes;
