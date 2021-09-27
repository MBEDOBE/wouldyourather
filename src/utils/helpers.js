export function formatDate(timestamp) {
  const a = new Date(timestamp);
  const t = a.toLocalTimeString(`en-US`);

  return t.substr(0, 5) + t.slice(-2) + "|" + a.toLocaleDateString();
}
export function sortByTime(questions, questionIds) {
  return questionIds.sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
}

export function getUnanswered(questionIds, answeredIds) {
  return questionIds.filter((questionId) => !answeredIds.includes(questionId));
}

export function getPercentVotes(optionVotes, totalVotes) {
  return Math.round((optionVotes / totalVotes) * 100).toString();
}

export function formatQuestion(question, users, authedUser) {
  const { id } = question;
  const hasAnswered = Object.keys(users[authedUser]["answers"]).includes(id);
  const answer = hasAnswered ? users[authedUser]["answers"][id] : "";
  return {
    hasAnswered,
    authorName: users[question["author"]]["name"],
    authorAvatar: users[question["author"]]["avatarURL"],
    optionOne: question["optionOne"]["text"],
    optionTwo: question["optionTwo"]["text"],
    answer,
    optionOneVotes: question["optionOne"]["votes"].length,
    optionTwoVotes: question["optionTwo"]["votes"].length,
  };
}

export function prepareLeaderBoard(users) {
  const leaderboard = Object.keys(users).map((user_id) => {
    let leader = users[user_id];
    leader["score"] =
      Object.keys(leader["answers"]).length + leader["questions"].length;
    return leader;
  });

  return leaderboard.sort((a, b) => b.score - a.score);
}
