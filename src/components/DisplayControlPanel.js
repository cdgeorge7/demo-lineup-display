import React from "react";

export default function DisplayControlPanel(props) {
  const startDemo = () => props.setStartDemo(true);
  return (
    <div className="control-panel-container">
      <div className="card card-pos">
        <div className="card-body">
          <div>
            <button className="btn btn-lg btn-info control-panel-button">
              Sort
            </button>
          </div>
          <div>
            <button
              className="btn btn-lg btn-info control-panel-button"
              onClick={startDemo}
            >
              Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
