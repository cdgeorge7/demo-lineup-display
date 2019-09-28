import React, { useState } from "react";

export default function DisplayControlPanel(props) {
  const [resetDisabled, setResetDisabled] = useState(true);

  const startDemo = () => {
    setResetDisabled(true);
    props.setDemoButtonState({
      initial: false,
      running: true,
      complete: false
    });
  };

  const pauseDemo = () => {
    setResetDisabled(false);
    props.setDemoButtonState({
      initial: false,
      running: false,
      complete: false
    });
  };

  const resetDemo = () => {
    props.setLineupsMinute(0);
    setResetDisabled(true);
    props.setLineupsData({});
    props.setTime();
    props.setDemoButtonState({
      initial: true,
      running: false,
      complete: false
    });
  };

  const controlDemo = () => {
    props.demoButtonState.initial
      ? startDemo()
      : props.demoButtonState.running
      ? pauseDemo()
      : props.demoButtonState.complete
      ? resetDemo()
      : startDemo();
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="float-left w-25">{props.time}</h3>
      <div className="card card-pos">
        <div className="card-body d-flex justify-content-center">
          <div className="btn-group">
            <button
              className="btn btn-lg btn-info control-panel-button"
              onClick={controlDemo}
              disabled={props.demoButtonState.complete}
            >
              {props.demoButtonState.initial
                ? "Start Demo"
                : !props.demoButtonState.running &&
                  !props.demoButtonState.complete
                ? "Continue Demo"
                : "Pause Demo"}
            </button>
            <button
              className="btn btn-lg btn-info control-panel-button"
              disabled={resetDisabled && !props.demoButtonState.complete}
              onClick={resetDemo}
            >
              Reset Demo
            </button>
            <button
              className="btn btn-lg btn-info control-panel-button"
              disabled={true}
            >
              Sort
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
