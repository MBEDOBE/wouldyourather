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

                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/add" exact component={NewQuestion} />
                <Route path="/question/:id" component={QuestionDetail} />
                <Route exact path="/leaderboard" component={LeaderBoard} />

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
