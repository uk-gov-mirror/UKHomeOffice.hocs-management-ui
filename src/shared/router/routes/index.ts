import Error, { ErrorContent } from '../../layouts/error';
import Dashboard from '../../pages/dashboard';
import TeamSearch from '../../pages/team_search';
import TeamView from '../../pages/team_view';
import AddUsersToTeam from '../../pages/team/addToTeam/addToTeam';
import AddUnit from '../../pages/unit/addUnit';

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
        exact: true,
        component: Dashboard,
        title: 'Dashboard'
    },
    {
        path: '/team_search',
        exact: true,
        component: TeamSearch,
        title: 'TeamSearch'
    },
    {
        path: '/team_view/:teamId',
        exact: true,
        component: TeamView,
        title: 'TeamView'
    },
    {
        path: '/team/:teamId/add-users',
        exact: true,
        component: AddUsersToTeam,
        title: 'AddUsersToTeam'
    },
    {
        path: '/add-unit',
        exact: true,
        component: AddUnit,
        title: 'Add Unit'
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
