import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../layouts/layout';
import routes from './routes/index';
import PageWrapper from '../layouts/page-enabled';

const Router : React.FC = () => (
          <Layout>
            <Switch>
              {routes.map(({ path, exact, component: Page, ...rest }, i) => {
                  return (
                    <Route
                      key={i}
                      path={path}
                      exact={exact}
                      render={props => (
                        <PageWrapper match={props.match}>
                          <Page {...props} {...rest} />
                        </PageWrapper>
                      )}
                    />
                  );
              })}
            </Switch>
          </Layout>
        );

export default Router;
