import React, { useState, useEffect, useRef } from "react";
import DisplayControlPanel from "./DisplayControlPanel";
import DisplayLineups from "./DisplayLineups";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export default function Display() {
  const [lineupsData, setLineupsData] = useState({});
  const [startDemo, setStartDemo] = useState(false);
  const [demoButtonState, setDemoButtonState] = useState({
    initial: true,
    running: false,
    complete: false
  });

  let lineupsMinute = useRef(0);
  let stopFlag = useRef(false);
  const MAX_DEMO_FETCHES = 200;

  const fetchDemoData = async () => {
    //const URL_LINEUP_DEMO = "http://localhost:5000/lineups";
    const URL_LINEUPS = API_BASE_URL + "/demo_lineups/" + lineupsMinute.current;
    //console.log(URL_LINEUPS);
    console.log("fetch", startDemo);
    if (stopFlag.current) {
      return;
    }
    if (startDemo) {
      //setDemoButtonState({ initial: false, running: true, complete: false });
      await axios
        .get(URL_LINEUPS)
        .then(response => {
          setLineupsData(response.data);
          //setfetchCount(fetchCount + 1);
          lineupsMinute.current += 1;
          //console.log(lineupsMinute.current);
          // don't like this, should be >=
          if (lineupsMinute.current === MAX_DEMO_FETCHES) {
            lineupsMinute.current = 0;
            setStartDemo(false);
            setDemoButtonState({
              initial: false,
              running: false,
              complete: true
            });
            return;
          }
          if (!stopFlag.current) {
            setTimeout(fetchDemoData, 100);
          }
        })
        .catch();
    }
  };

  useEffect(() => {
    console.log("useEffect", startDemo);
    if (startDemo) {
      stopFlag.current = false;
      fetchDemoData();
    } else {
      stopFlag.current = true;
    }
  }, [startDemo]);

  return (
    <div className="container">
      <DisplayControlPanel
        setStartDemo={setStartDemo}
        demoButtonState={demoButtonState}
        setDemoButtonState={setDemoButtonState}
      />
      <DisplayLineups lineupsData={lineupsData} />
    </div>
  );
}
