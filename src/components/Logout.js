import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authUser";

class Logout extends Component {
  componentDidMount() {
    this.props.setAuthedUser(null);
  }
  render() {
    return <div>Logging out...</div>;
  }
}
export default connect(null, { setAuthedUser })(Logout);
