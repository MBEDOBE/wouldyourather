import React, { Component, Fragment } from "react";
import Login from "./Log";
import "../index.css";
import { handleInitialData } from "../actions/shared";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import QuestionDetail from "./QuestionDetail";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className="container">
            <div className="main-content">
              <Switch>
                <Route path="/" exact component={Login} />

                <ProtectedRoute path="/dashboard" exact component={Dashboard} />
                <ProtectedRoute path="/add" exact component={NewQuestion} />
                <ProtectedRoute
                  path="/question/:id"
                  component={QuestionDetail}
                />
                <ProtectedRoute
                  exact
                  path="/leaderboard"
                  component={LeaderBoard}
                />
                <Route path="/not-found" component={NotFound} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect()(App);
