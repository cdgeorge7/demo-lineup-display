import React from "react";
import Lineup from "./Lineup";

export default function DisplayLineups(props) {
  if (
    Object.entries(props.lineupsData).length === 0 &&
    props.lineupsData.constructor === Object
  ) {
    return <div>No lineups to display.</div>;
  } else {
    return (
      <div className="container-fluid lineup-display-container">
        <div className="row">
          {props.lineupsData.lineups.map(lineupData => (
            <Lineup key={lineupData.lineup_id} lineupData={lineupData} />
          ))}
        </div>
      </div>
    );
  }
}
