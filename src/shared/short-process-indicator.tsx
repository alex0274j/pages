import React, { useState } from "react";
import { useSelector } from "react-redux";

let animation: number | undefined;
let curDots = "";

function dotAnimation(): string {
  curDots += ".";
  if (curDots.length > 3) {
    curDots = "";
  }
  return curDots;
}

const ShortProcessIndicator = (): JSX.Element | null => {
  const [dots, setDots] = useState("");

  const spinner = useSelector(
    (state: { spinner: { value?: string; message: string } }) => state.spinner
  );
  const { value, message } = spinner;
  const spiActive = value === "spi";

  if (spiActive && animation === undefined) {
    animation = window.setInterval(() => {
      setDots(dotAnimation());
    }, 2000);
  }

  if (spiActive) {
    return (
      <div id="spi" tabIndex={-1}>
        <div className="loading-box">
          <div className="loading-message">
            <span className="icon icon-waiting-dark rotation-slow-pause" />
            {message}
            <span style={{ display: "inline-block", width: "20px" }}>{dots}</span>
          </div>
        </div>
      </div>
    );
  }

  window.clearInterval(animation);
  animation = undefined;

  return null;
};

export default ShortProcessIndicator;
