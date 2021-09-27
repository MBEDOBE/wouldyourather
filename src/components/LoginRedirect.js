import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class LoginRedirect extends Component {
  render() {
    const { from } = this.props;
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            from,
          },
        }}
      />
    );
  }
}

export default LoginRedirect;
