import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authUser";

class Nav extends Component {
  handleLogout = () => {
    this.props.dispatch(setAuthedUser(null));
  };
  render() {
    const { user } = this.props;
    const userAvatar = user ? user.avatarURL : "a";
    const name = user ? user.name : "";
    return (
      // avatars from https://tylermcginnis.com/would-you-rather
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/dashboard" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add" exact activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/leaderboard" exact activeClassName="active">
              Leaderboard
            </NavLink>
          </li>

          <li className="nav-item logout">
            <NavLink
              to="/"
              exact
              activeClassName="active"
              onClick={this.handleLogout}
            >
              Log out
            </NavLink>
          </li>
          <li className="user-greeting">
            <span>{name}</span>
          </li>
          <li>
            <Avatar alt="avatar" className="user-avatar" src={userAvatar} />
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }, props) {
  return {
    authedUser,
    users,
    user: users[authedUser],
  };
}
export default connect(mapStateToProps)(Nav);
