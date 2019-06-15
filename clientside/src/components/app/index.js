import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import * as Routes from '../../constants/routes';

import Dashboard from '../dashboard/index';
import Login from '../login';
import Setting from '../setting';
import CameraInternal from '../cameraint';
import CameraExternal from '../cameraext';




function App() {
  return (
    <Router>
  
        <Route exact path={Routes.Login} component={Login} />
        <Route path={Routes.Dashboard} component={Dashboard} />
        <Route path={Routes.Setting} component={Setting} />
        <Route path={Routes.CameraInternal} component={CameraInternal} />
        <Route path={Routes.CameraExternal} component={CameraExternal} />

    </Router>

  );
}

export default App;

