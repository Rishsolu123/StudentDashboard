import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../Modules/Auth/Containers/Auth';
import StudentData from '../Modules/StudentData/Containers/StudentData';
import StudentDesc from '../Modules/StudentData/Containers/StudentDesc';






class RootRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/studentData" component={StudentData} />
            <Route path="/studentDesc/:id" component={StudentDesc} />
        </Switch>
      </Router>)
  }
}

export default RootRouter;