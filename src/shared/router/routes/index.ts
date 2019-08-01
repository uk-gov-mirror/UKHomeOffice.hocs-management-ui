import Error, { ErrorContent } from '../../layouts/error';
import Dashboard from '../../pages/dashboard';

export interface Route {
    component: React.FunctionComponent | Error;
    error?: ErrorContent;
    exact: boolean;
    path: string;
    title: string;
}
const routes = [
    {
        path: '/',
        exact: false,
        component: Dashboard,
        title: 'Dashboard'
    },
    {
        component: Error,
        error: {
            location: {
                pathname: ''
            },
            message: '',
            stack: '',
            status: 401,
            title: ''
        }
    }
];

export default routes;
