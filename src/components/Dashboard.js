import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import LoginRedirect from "./LoginRedirect";

class Dashboard extends Component {
  state = {
    showAnswered: false,
    value: 0,
  };
  filterQuestions = (showAnswered) => {
    this.setState((state) => {
      return { showAnswered: showAnswered };
    });
  };
  handleQuestionsChange = (e, value) => {
    this.setState({ value });
  };

  render() {
    const { showAnswered } = this.state;
    const { questions, authedUser } = this.props;
    const questionsArray = Object.values(questions);
    const filteredQuestions = questionsArray.filter(function (question) {
      const contains =
        question.optionOne.votes.indexOf(authedUser) > -1 ||
        question.optionTwo.votes.indexOf(authedUser) > -1;
      return showAnswered ? contains : !contains;
    });
    const sortedQuestions = filteredQuestions.sort(
      (a, b) => b.timestamp - a.timestamp
    );
    
    if(this.props.loggedOut){
      return<LoginRedirect afterLogin='/dashboard'/>
    }
    return (
      <div className='home'>
      <Nav/>
        <div className="tabs-container">
          <Paper square>
            <Tabs
              value={this.state.value}
              textColor="primary"
              indicatorColor="primary"
              centered
              onChange={this.handleQuestionsChange}
            >
              <Tab
                className={!showAnswered ? "btn-selected" : "btn-default"}
                onClick={(e) => this.filterQuestions(false)}
                label="UnAnswered"
              />

              <Tab
                className={showAnswered ? "btn-selected" : "btn-default"}
                onClick={(e) => this.filterQuestions(true)}
                label="Answered"
              />
            </Tabs>
          </Paper>
          <div className="questions-container">
            <ul className="questions-list">
              {sortedQuestions.map((question) => (
                <li key={question.id}>
                  <Link to={`question/${question["id"]}`}>
                    <Question id={question.id} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ questions, authedUser }) => {
  return {
    authedUser,
    questions,
  };
};
export default connect(mapStateToProps)(Dashboard);
