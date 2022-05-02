import "./styles.css";
import { wonImg, lostImg } from "./assets";

export default function Table({ data }) {
  let wins = {};
  let matchesPlayed = {};
  let matchesArray = [];

  data?.forEach(({ winner }) => {
    if (wins[winner]) {
      wins[winner] = wins[winner] + 1;
    } else {
      wins[winner] = 1;
    }
  });

  data?.map(({ team1, team2, winner }) => {
    winner && matchesArray.push(team1, team2);
  });

  matchesArray.forEach((item) => {
    if (matchesPlayed[item]) {
      matchesPlayed[item] = matchesPlayed[item] + 1;
    } else {
      matchesPlayed[item] = 1;
    }
  });

  let last5matches = [];

  data.forEach(({ team1, team2, winner }) => {
    if (winner) {
      let obj = {};
      if (team1 === winner) {
        obj[team1] = "won";
        obj[team2] = "lost";
        last5matches.push(obj);
      } else {
        obj[team1] = "lost";
        obj[team2] = "won";
        last5matches.push(obj);
      }
    }
  });

  last5matches = last5matches.reverse();
  let result = {};
  last5matches.forEach((matchResult) => {
    const teams = Object.keys(matchResult);
    teams.forEach((team) => {
      if (!result.hasOwnProperty(team)) result[team] = [];
      if (result[team]?.length === 5) return;
      result[team] = [...result[team], matchResult[team]];
    });
  });

  let sortedWins = [];
  for (var team in wins) {
    team !== "null" && sortedWins.push([team, wins[team]]);
  }

  sortedWins?.sort((a, b) => b[1] - a[1]);

  return (
    <div className="tally">
      <div className="table-header">
        <span>Team</span>
        <div>
          <span>M</span>
          <span>W</span>
          <span>L</span>
          <span>Pts</span>
          <span>Last 5</span>
        </div>
      </div>
      <hr></hr>
      {sortedWins.map((item, index) => {
        return (
          <div className="match-details">
            <div className="team-details">
              <div>{index + 1}</div>
              <div>{item[0]}</div>
            </div>
            <div className="stats">
              <div>{matchesPlayed[item[0]]}</div>
              <div>{item[1]}</div>
              <div>{matchesPlayed[item[0]] - item[1]}</div>
              <div>{item[1] * 2}</div>
              <div>
                {result[item[0]]?.map((item) => {
                  if (item === "won") {
                    return <img src={wonImg} alt="won"></img>;
                  }
                  return <img src={lostImg} alt="lost"></img>;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
