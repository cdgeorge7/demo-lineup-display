import React from "react";

export default function Lineup(props) {
  return (
    <div>
      <h3>
        {props.lineupData.lineup_id}:{props.lineupData.lineup_points}
      </h3>
      {props.lineupData.players.map(player => (
        <div>
          {player.position} - {player.player_name} - {player.team} -{" "}
          {player.dk_points}
        </div>
      ))}
    </div>
  );
}
