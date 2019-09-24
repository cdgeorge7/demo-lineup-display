import React from "react";

export default function DisplayLineups(props) {
  console.log(props.lineupsData);
  if (
    Object.entries(props.lineupsData).length === 0 &&
    props.lineupsData.constructor === Object
  ) {
    return <div>No lineups to display.</div>;
  } else {
    return (
      <div>
        {props.lineupsData.lineups.map(lineup => (
          <h3 key={lineup.id}>{lineup.lineup_points}</h3>
        ))}
      </div>
    );
  }
}
