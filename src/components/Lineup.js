import React, { useState /*, useRef */ } from "react";
import PlayerRow from "./PlayerRow";

export default function Lineup(props) {
  const [showLineup, setShowLineup] = useState(false);
  //if we implement the score counter...
  //let savedPoints = useRef(props.lineupData.lineup_points);
  return (
    <div className="pt-1 col-4">
      <button
        className="btn btn-info btn-block"
        type="button"
        onClick={e => {
          setShowLineup(!showLineup);
        }}
      >
        Score: {props.lineupData.lineup_points.toFixed(2)} | QB:{" "}
        {props.lineupData.players[0].player_name} | ID:{" "}
        {props.lineupData.lineup_id}
      </button>
      {showLineup ? (
        <div className="">
          <table className="table table-bordered table-striped table-hover table-sm">
            <thead>
              <tr>
                <th>Position</th>
                <th>Player</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {props.lineupData.players.map(playerData => (
                <PlayerRow
                  key={playerData.player_name}
                  playerData={playerData}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
