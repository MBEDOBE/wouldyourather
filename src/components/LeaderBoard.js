import React, { Component } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import LoginRedirect from "./LoginRedirect";
import Nav from "./Nav";
import { connect } from "react-redux";
import { prepareLeaderBoard } from "../utils/helpers";

class LeaderBoard extends Component {
  render() {
    if (this.props.loggedOut) {
      return <LoginRedirect afterLogin="/leaderboard" />;
    }

    const { leaderboard } = this.props;
    return (
      <div className="leaderboard">
        <Nav />
        <div className="leaderboard-table">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Leader</TableCell>
                  <TableCell>Questions</TableCell>
                  <TableCell>Answers</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((leader) => {
                  return (
                    <TableRow key={leader.id}>
                      <TableCell>
                        <img
                          alt="avatar"
                          className="small-avatar"
                          src={leader.avatarURL}
                        />
                        <span className="leader-name">{leader.name}</span>
                      </TableCell>
                      <TableCell numeric>{leader.questions.length}</TableCell>
                      <TableCell numeric>
                        {Object.keys(leader.answers).length}
                      </TableCell>
                      <TableCell numeric>{leader.score}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => ({
  loggedOut: authedUser === null,
  leaderboard: prepareLeaderBoard(users),
});

export default connect(mapStateToProps)(LeaderBoard);
