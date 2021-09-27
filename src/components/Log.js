import React, { Component } from "react";
import logo from "../assets/logo.jpg";
import { clearAuthedUser, setAuthedUser } from "../actions/authUser";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    userId: null,
    loggedIn: false,
  };

  handleUserChange = (e) => {
    e.preventDefault();
    const userId = e.target.value;

    this.setState(function (previousState) {
      return {
        ...previousState,
        userId,
      };
    });
  };

  userLogin = function (e) {
    const { userId } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(userId));

    this.setState(function (previousState) {
      return {
        ...previousState,
        loggedIn: true,
      };
    });
  };

  componentDidMount() {
    this.props.dispatch(clearAuthedUser());
  }

  render() {
    const { userId } = this.state;
    const { users } = this.props;

    /* let afterLogin = "/dashboard";
     if(this.props.location.state){
       afterLogin = this.props.location.state.afterLogin;
     } */
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" },
    };
    const selected = userId ? userId : -1;

    if (this.state.loggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-box">
        <img src={logo} alt="logo" className="logo" />
        <h1>Would You Rather...?</h1>
        <form>
          <p>Select a user account to play</p>
          <select value={selected} onChange={this.handleUserChange}>
            <option value="-1"></option>
            {Object.keys(users).map(function (key) {
              return (
                <option value={users[key].id} key={key}>
                  {users[key].name}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            className="btn-submit"
            disabled={userId === null}
            onClick={(e) => this.userLogin(e)}
          >
            Sign In
          </button>
          <a href="#no-register-component">Register</a>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}
export default withRouter(connect(mapStateToProps)(Login));
