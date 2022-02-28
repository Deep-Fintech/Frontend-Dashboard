import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import SingleStep from "../components/Live/SingleStep";

function MainRoute() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
           <Home/>
          </Route>
          <Route exact path="/singlestep">
            <SingleStep benchmark={0} />
          </Route>
          <Route exact path="/b1">
            <SingleStep benchmark={1} />
          </Route>
          <Route exact path="/b2">
            <SingleStep benchmark={2} />
          </Route>
          <Route exact path="/b4">
            <SingleStep benchmark={4} />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default MainRoute;
