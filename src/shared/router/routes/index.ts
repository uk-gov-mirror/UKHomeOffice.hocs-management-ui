import Error, { ErrorContent } from '../../layouts/error';
import Dashboard from '../../pages/dashboard';
import TeamSearch from '../../pages/team/teamSearch/teamSearch';
import TeamView from '../../pages/team/teamView/teamView';
import AddUsersToTeam from '../../pages/team/addToTeam/addToTeam';
import AddUnit from '../../pages/unit/addUnit';
import TopicView from '../../pages/topic/topicView/topicView';
import TopicSearch from '../../pages/topic/topicSearch/topicSearch';
import AddChildTopic from '../../pages/topic/addChildTopic/addChildTopic';
import AddTeamsToTopic from '../../pages/topic/addTeamsToTopic/addTeamsToTopic';
import UnitSearch from '../../pages/unit/unitSearch/unitSearch';
import AddStandardLine from '../../pages/standardLine/addStandardLine';
import AddTemplate from '../../pages/template/addTemplate';
import AddNominatedContact from '../../pages/team/addNominatedContact/addNominatedContact';
import SelectCaseType from '../../pages/template/selectCaseType';

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
        path: '/team-search',
        exact: true,
        component: TeamSearch,
        title: 'TeamSearch'
    },
    {
        path: '/team-view/:teamId',
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
        path: '/topic-to-team',
        exact: true,
        component: TopicSearch,
        title: 'TopicSearch'
    },
    {
        path: '/topic/:topicId',
        exact: true,
        component: TopicView,
        title: 'TopicView'
    },
    {
        path: '/topic/:topicValue/private-minister/:privateMinisterValue/draft-qa/:draftQaValue',
        exact: true,
        component: AddTeamsToTopic,
        title: 'AddTeamsToTopic'
    },
    {
        path: '/add-child-topic',
        exact: true,
        component: AddChildTopic,
        title: 'Add Child Topic'
    },
    {
        path: '/add-standard-line',
        exact: true,
        component: AddStandardLine,
        title: 'Add Standard Line'
    },
    {
        path: '/unit-search',
        exact: true,
        component: UnitSearch,
        title: 'UnitSearch'
    },
    {
        path: '/add-template',
        exact: true,
        component: AddTemplate,
        title: 'Add Template'
    },
    {
        path: '/team/:teamId/add-nominated-contact',
        exact: true,
        component: AddNominatedContact,
        title: 'Add Nominated Contact'
    },
    {
        path: '/select-a-case-type',
        exact: true,
        component: SelectCaseType,
        title: 'Select a Case Type'
    },
    {
        component: Error,
        error: {
            location: {
                pathname: ''
            },
            message: '',
            stack: '',
            status: 404,
            title: ''
        }
    }
];

export default routes;
