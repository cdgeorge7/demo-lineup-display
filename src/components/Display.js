import React, { useState, useEffect, useRef } from "react";
import DisplayControlPanel from "./DisplayControlPanel";
import DisplayLineups from "./DisplayLineups";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Display() {
  const [lineupsData, setLineupsData] = useState({});
  const [startDemo, setStartDemo] = useState(false);

  let savedFetchCount = useRef(0);
  const MAX_DEMO_FETCHES = 2;

  const fetchDemoData = async () => {
    const URL_LINEUP_DEMO = "http://localhost:5000/lineups";
    let URL_LINEUPGROUP_ID_PARAMETER = "?lineup_id=";
    if (startDemo) {
      await axios
        .get(URL_LINEUP_DEMO)
        .then(response => {
          setLineupsData(response.data);
          //setfetchCount(fetchCount + 1);
          savedFetchCount.current += 1;
          console.log(savedFetchCount.current);
          if (savedFetchCount.current === MAX_DEMO_FETCHES) {
            savedFetchCount.current = 0;
            setStartDemo(false);
            return;
          }
          setTimeout(fetchDemoData, 100);
        })
        .catch();
    }
  };

  useEffect(() => {
    fetchDemoData();
  }, [startDemo]);

  return (
    <div className="container">
      <DisplayControlPanel setStartDemo={setStartDemo} />
      <DisplayLineups lineupsData={lineupsData} />
    </div>
  );
}
