import React, { useState } from "react";

export default function DisplayControlPanel(props) {
  const startDemo = () => {
    props.setStartDemo(true);
    props.setDemoButtonState({
      initial: false,
      running: true,
      complete: false
    });
  };

  const pauseDemo = () => {
    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWHHHHHHHHHHHHHYYYYYYYYYYYYYY");
    props.setStartDemo(false);
    props.setDemoButtonState({
      initial: false,
      running: false,
      complete: false
    });
  };

  const resetDemo = () => {
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
    <div className="control-panel-container">
      <div className="card card-pos">
        <div className="card-body">
          <div className="btn-group">
            <button
              className="btn btn-lg btn-info control-panel-button"
              onClick={controlDemo}
            >
              {props.demoButtonState.initial ? "Start Demo" : "Pause Demo"}
            </button>
            <button className="btn btn-lg btn-info control-panel-button">
              Reset Demo
            </button>
            <button className="btn btn-lg btn-info control-panel-button">
              Sort
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
