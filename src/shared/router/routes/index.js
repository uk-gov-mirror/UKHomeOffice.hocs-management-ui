import Error from '../../layouts/error.jsx';
import MainPage from '../../pages/dashboard.jsx';

const routes = [
    {
        path: '/',
        exact: true,
        component: MainPage,
        title: 'Dashboard'
    },
    {
        component: Error,
        error: { status: 404 }
    }
];

export default routes;
