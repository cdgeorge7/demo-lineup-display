import React from "react";

export default function PlayerRow(props) {
  return (
    <tr>
      <td>{props.playerData.position}</td>
      <td>{props.playerData.player_name}</td>
      <td>{props.playerData.team}</td>
      <td>{props.playerData.dk_points.toFixed(2)}</td>
    </tr>
  );
}
