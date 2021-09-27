import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
  render() {
    const { question, author, authorAvatar } = this.props;
    return (
      <div className="title-item">
        <div className="header">{author.name} would like to know if you:</div>
        <div className="title-body">
          <div className="title-left">
            <Avatar
              alt={`Avatar of ${author}`}
              className="avatar"
              src={authorAvatar}
              sx={{width: 56, height: 56}}
            />
          </div>

          <div className="question-body">
            <div className="question-head">Would you rather</div>
            <div className="question-text">{question.optionOne.text}...</div>
            <button className="btn-vw">View</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(
  { authedUser, users, questions },
  { id }
) {
  const question = questions[id];
  const author = question ? users[question.author] : null;

  return {
    authedUser,
    question,
    author,
    authorAvatar: users[question["author"]]["avatarURL"],
  };
}
export default connect(mapStateToProps)(Question);
