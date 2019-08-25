import React from 'react';

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from './protected.route'

import * as Routes from '../../constants/routes';

import Dashboard from '../dashboard/index';
import Login from '../login';
import Setting from '../setting';
import CameraInternal from '../cameraint';
import ExternalCamera from '../cameraext';
import Layout from '../layout';
import Scheduler from '../scheduler'
import Logs from '../logs'



class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path={Routes.Login} component={Login} />
            <ProtectedRoute path={Routes.Dashboard} component={Dashboard} />
            <ProtectedRoute path={Routes.Setting} component={Setting} />
            <ProtectedRoute path={Routes.CameraInternal} component={CameraInternal} />
            <ProtectedRoute path={Routes.CameraExternal} component={ExternalCamera} />
            <ProtectedRoute path={Routes.Scheduler} component={Scheduler} />
            <ProtectedRoute path={Routes.Logs} component={Logs} />
          </Switch>
        </Layout>
      </Router >
    )
  }

}

export default App;

