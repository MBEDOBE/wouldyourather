import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import LoginRedirect from "./LoginRedirect";
import Nav from "./Nav";

class QuestionDetail extends Component {
  state = {
    selectedAnswer: "",
  };
  handleSaveAnswer(e) {
    e.preventDefault();

    const { dispatch, authedUser, id } = this.props;
    const { selectedAnswer } = this.state;

    dispatch(
      handleAddAnswer({
        qid: id,
        authedUser,
        answer: selectedAnswer,
      })
    );
  }
  chooseAnswer(answer) {
    this.setState((prevState) => {
      return { selectedAnswer: answer };
    });
  }
  render() {
    if(this.props.loggedOut){
      return <LoginRedirect afterLogin={`/auestions/${this.props.qid}`}/>
    }
    const {
      question,
      author,
      authorAvatar,
      answered,
      answer,
      votesOptionOne,
      votesOptionTwo,
      totalVotes,
      percentageOptionOne,
      percentageOptionTwo,
    } = this.props;
    const { selectedAnswer } = this.state;

    if (!question) {
      return <Redirect to="/not-found" />;
    }
    return (
      <div className="content">
      <Nav/>

        <div className={answered ? "title-item question-detail" : "title-item"}>
          {answered ? (
            <div className="header">Asked by {author.name}</div>
          ) : (
            <div className="header">
              {author.name} would like to know if you
            </div>
          )}
          <div className="title-body">
            <div className="title-left">
              <Avatar alt="avatar" className="avatar" src={authorAvatar} />
            </div>

            {!answered ? (
              <div className="question-body2">
                <div className="question-head">Would you rather</div>
                <div
                  className={
                    selectedAnswer === "optionOne"
                      ? "option option-selected"
                      : "option"
                  }
                  onClick={(e) => {
                    this.chooseAnswer("optionOne");
                  }}
                >
                  {question.optionOne.text}
                </div>
                <div
                  className={
                    selectedAnswer === "optionTwo"
                      ? "option option-selected"
                      : "option"
                  }
                  onClick={(e) => {
                    this.chooseAnswer("optionTwo");
                  }}
                >
                  {question.optionTwo.text}
                </div>
                <button style={{marginBottom: "15px"}}
                  className={selectedAnswer ? "btn-active" : "disabled"}
                  onClick={(e) => {
                    this.handleSaveAnswer(e);
                  }}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="question-body2">
                <div className="question-head">Results: </div>
                <div
                  className={
                    answer === "optionOne"
                      ? "option-container selected"
                      : "option-container"
                  }
                >
                  <div className="option-one">{question.optionOne.text}</div>

                  <div className="poll-container">
                    <div>
                      {votesOptionOne} out of {totalVotes} votes
                    </div>
                    <div>Percentage votes: {percentageOptionOne}%</div>
                  </div>
                  <div className="your-vote">Your pick</div>
                </div>

                <div
                  className={
                    answer === "optionTwo"
                      ? "option-container selected"
                      : "option-container"
                  }
                >
                  <div className="option-two">{question.optionTwo.text}</div>

                  <div className="poll-container">
                    <div>
                      {votesOptionTwo} out of {totalVotes} votes
                    </div>
                    <div>Percentage votes: {percentageOptionTwo}%</div>
                  </div>
                  <div className="your-vote">Your pick</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(
  { authedUser, users, questions, authorAvatar },
  { match }
) {
  const { id } = match.params;
  const question = questions[id];
  const author = question ? users[question.author] : null;

  const answered = question
    ? question.optionOne.votes.indexOf(authedUser) > -1 ||
      question.optionTwo.votes.indexOf(authedUser) > -1
    : false;
  const votesOptionOne =
    question && question.optionOne.votes ? question.optionOne.votes.length : 0;
  const votesOptionTwo =
    question && question.optionTwo.votes ? question.optionTwo.votes.length : 0;
  const totalVotes = votesOptionOne + votesOptionTwo;
  const percentageOptionOne = ((votesOptionOne / totalVotes) * 100).toFixed(1);
  const percentageOptionTwo = ((votesOptionTwo / totalVotes) * 100).toFixed(1);

  //get answer of authedUser
  const answer = users[authedUser].answers[id];

  return {
    id,
    authedUser,
    question,
    author,
    answered,
    answer,
    votesOptionOne,
    votesOptionTwo,
    totalVotes,
    percentageOptionOne,
    percentageOptionTwo,
    
  };
}
export default connect(mapStateToProps)(QuestionDetail);
