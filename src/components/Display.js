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
  const [time, setTime] = useState();
  const [hasError, setHasError] = useState(false);
  const [demoButtonState, setDemoButtonState] = useState({
    initial: true,
    running: false,
    complete: false
  });

  let lineupsMinute = useRef(400);
  const setLineupsMinute = minute => {
    lineupsMinute.current = minute;
  };
  let continueFlag = useRef(false);
  const MAX_DEMO_FETCHES = 414;

  const fetchDemoData = async () => {
    const URL_LINEUPS = API_BASE_URL + "/demo_lineups/" + lineupsMinute.current;
    if (!continueFlag.current) {
      return;
    }
    if (demoButtonState.running) {
      await axios
        .get(URL_LINEUPS)
        .then(response => {
          setLineupsData(response.data);
          setTime(response.data.time);
          lineupsMinute.current += 1;
          if (lineupsMinute.current === MAX_DEMO_FETCHES) {
            lineupsMinute.current = 0;
            setDemoButtonState({
              initial: false,
              running: false,
              complete: true
            });
            return;
          }
          if (continueFlag.current) {
            setTimeout(fetchDemoData, 100);
          }
        })
        .catch(err => {
          setHasError(true);
        });
    }
  };

  useEffect(() => {
    if (demoButtonState.running) {
      continueFlag.current = true;
      fetchDemoData();
    } else {
      continueFlag.current = false;
    }
  }, [demoButtonState]);

  return (
    <div className="container">
      <DisplayControlPanel
        demoButtonState={demoButtonState}
        setDemoButtonState={setDemoButtonState}
        setLineupsMinute={setLineupsMinute}
        time={time}
      />
      {hasError ? (
        <div>Something went wrong...</div>
      ) : (
        <DisplayLineups lineupsData={lineupsData} />
      )}
    </div>
  );
}
