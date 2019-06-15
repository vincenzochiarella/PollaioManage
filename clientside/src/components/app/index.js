import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as Routes from '../../constants/routes';

import Dashboard from '../dashboard/index';
import Login from '../login';
import Setting from '../setting';
import CameraInternal from '../cameraint';
import CameraExternal from '../cameraext';


class App extends React.Component{
  state = {
    auth: false,
    id: null
  }
  changeAuthState(bool, id){
    this.setState({
      auth: bool,
      id: id
    })
  }
  render(){
    return(
      <Router>
      <Switch>
        <Route exact path={Routes.Login} component={() => <Login
          auth={this.changeAuthState}
        />} />
        <Route path={Routes.Dashboard} component={Dashboard} />
        <Route path={Routes.Setting} component={Setting} />
        <Route path={Routes.CameraInternal} component={CameraInternal }  />
        <Route path={Routes.CameraExternal} component={CameraExternal} />
      </Switch>

    </Router>
    )
  }

}

export default App;

