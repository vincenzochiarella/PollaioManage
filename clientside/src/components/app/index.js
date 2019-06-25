import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from './protected.route'

import * as Routes from '../../constants/routes';

import Dashboard from '../dashboard/index';
import Login from '../login';
import Setting from '../setting';
import CameraInternal from '../cameraint';
import CameraExternal from '../cameraext';
import Layout from '../layout';

import decode from 'jwt-decode'


class App extends React.Component {
  checkAuth = () => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    if(!token|| !refreshToken){
      return false
    }
    try{
      const { exp } = decode(refreshToken)
      if (exp < new Date.getTime()){
        return false
      }
    }catch(e){
      return false
    }
    
    return true
  }

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path={Routes.Login} component={Login} />
            <ProtectedRoute path={Routes.Dashboard} component={Dashboard} />
            <ProtectedRoute path={Routes.Setting} component={Setting} />
            <ProtectedRoute path={Routes.CameraInternal} component={CameraInternal} />
            <ProtectedRoute path={Routes.CameraExternal} component={CameraExternal} />
          </Switch>
        </Layout>
      </Router >
    )
  }

}

export default App;

