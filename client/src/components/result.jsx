import React from "react";
import "../../src/components/styles/result.css";

export default function Result(result) {
  result = {
    league: "PBA",
    home: "TROPANG GIGA",
    away: "BRGY GINEBRA",
    home_score: 108,
    away_score: 112,
    winner: "BRGY GINEBRA",
    event_time: "06.11.2024 19:30",
  };

  return (
    <div className="game-container">
      <h1>{result.league}</h1>
      <div className="result-container">
        <h4>{result.event_time}</h4>
        <div className="team1 team">
          <p className="team-name">{result.home}</p>
          <p
            className={`team-score ${
              result.home_score > result.away_score ? "win-score" : "lose-score"
            }`}
          >
            {result.home_score}
          </p>
        </div>
        <div className="team2 team">
          <p className="team-name">{result.away}</p>
          <p
            className={`team-score ${
              result.away_score > result.home_score ? "win-score" : "lose-score"
            }`}
          >
            {result.away_score}
          </p>
        </div>
      </div>
    </div>
  );
}
