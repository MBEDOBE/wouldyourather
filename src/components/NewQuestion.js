import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router";
import LoginRedirect from "./LoginRedirect";
import { connect } from "react-redux";
import Nav from "./Nav";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleInputChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;

    this.props.dispatch(handleAddQuestion(optionOneText, optionTwoText));
    this.setState({
      optionOneText: "",
      optionTwoText: "",
      toHome: true,
    });
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (this.props.loggedOut) {
      return <LoginRedirect afterLogin="/add" />;
    }
    if (toHome) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="new-question">
        <Nav />
        <h3>Ask Your Question</h3>
        <h2>Would You Rather...</h2>
        <textarea
          className="textarea"
          placeholder="Enter option one..."
          value={optionOneText}
          onChange={this.handleInputChange("optionOneText")}
        />
        <textarea
          className="textarea"
          placeholder="Enter option two..."
          value={optionTwoText}
          onChange={this.handleInputChange("optionTwoText")}
        />
        <Button
        className='btn'
          variant="outlined"
          size="small"
          color="primary"
          onClick={this.handleSubmit}
          disabled={optionOneText === "" || optionTwoText === ""}
        >SUBMIT</Button>
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser }) => ({
  loggedOut: authedUser === null,
});
export default connect(mapStateToProps)(NewQuestion);
