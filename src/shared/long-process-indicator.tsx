/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

const ProgressSVG = (props: { progress: number; height: string }): JSX.Element => {
  const { progress, height } = props;
  const strokeWidth = 10;

  // svg path

  const cirlePath = "M 55 5 a 50 50 0 0 1 0 100 a 50 50 0 0 1 0 -100";

  const styleGrey = {
    fill: "none",
    stroke: "#EBEBEB",
    margin: "10px auto"
  };

  const styleBlue = {
    fill: "none",
    stroke: "#86d6ea"
  };

  // show number in the middle of the circel

  let px;
  if (progress < 100 && progress >= 10) {
    px = 69;
  } else if (progress < 10) {
    px = 63;
  } else {
    px = 74;
  }


  const props3 = useSpring({
    // calculate blue progress ring

    progressRing: `${progress * Math.PI}, 1000`,
    progress,
    px
  });

  return (
    <svg
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 110"
      style={{ margin: "0 auto", display: "block" }}
    >
      {/* Perecent as text */}
      <animated.text
        x={props3.px}
        y="64"
        stroke="black"
        strokeWidth="1"
        fontSize="2em"
        fontFamily="Inter"
        style={{ textAnchor: "end" }}
      >
        {props3.progress.to((xa) => Math.round(xa))}
      </animated.text>
      {/* Percent as symbol */}
      <animated.text
        x={props3.px}
        y="64"
        stroke="black"
        strokeWidth="0"
        fontSize="1em"
        fontFamily="Inter"
      >
        %
      </animated.text>
      {/* Filled circle grey */}
      <path d={cirlePath} style={styleGrey} strokeWidth={strokeWidth} />

      {/* Filled circle blue */}
      <animated.path
        style={styleBlue}
        d={cirlePath}
        strokeWidth={strokeWidth}
        strokeDasharray={props3.progressRing}
      />

    </svg>
  );
};

const EndlessSVG = (props: { height: string }): JSX.Element => {
  const { height } = props;
  const strokeWidth = 10;
  const [flip, set] = useState(false);

  // svg path

  const cirlePath = "M 55 5 a 50 50 0 0 1 0 100 a 50 50 0 0 1 0 -100";

  const styleGrey = {
    fill: "none",
    stroke: "#EBEBEB",
    margin: "10px auto"
  };

  // ! Fill with blue than with grey

  let styleBlue = {
    fill: "none",
    stroke: "#86d6ea",
    transformOrigin: "center",
    transform: "scaleX(1)"
  };
  if (flip === true) {
    styleBlue = {
      fill: "none",
      stroke: "#86d6ea",
      transformOrigin: "center",
      transform: "scaleX(-1)"
    };
  }

  const springProps = useSpring({
    from: { progressRing: "0, 1000" },
    to: { progressRing: `${100 * Math.PI}, 1000` },
    config: { duration: 3000 },
    reverse: flip,
    reset: true,
    onRest: () => set(!flip)
  });


  return (
    <svg
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 110"
      style={{ margin: "0 auto", display: "block" }}
    >
      {/* Filled circle grey */}
      <path d={cirlePath} style={styleGrey} strokeWidth={strokeWidth} />

      {/* Filled circle blue */}
      <animated.path
        style={styleBlue}
        d={cirlePath}
        strokeWidth={strokeWidth}
        strokeDasharray={springProps.progressRing}
      />
      <circle cx="46" cy="55" r="1" stroke="black">
        <animate
          attributeName="r"
          values="1; 2; 1"
          begin="0s"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="55" cy="55" r="1" stroke="black">
        <animate
          attributeName="r"
          values="1; 2; 1"
          begin="0.5s"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="64" cy="55" r="1" stroke="black">
        <animate
          attributeName="r"
          values="1; 2; 1"
          begin="1s"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

const LongProcessIndicator = (): JSX.Element => {
  const spinner = useSelector(
    (state: {
      spinner: {
        value?: string;
        message: string;
        progress: number;
        withProgress: boolean;
      };
    }) => state.spinner
  );
  const { value, message, progress, withProgress } = spinner;
  const lpiActive = value === "lpi";
  const centeredText: React.CSSProperties = { textAlign: "center" };

  return (
    <Modal id="lip" centered show={lpiActive} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="icon icon-info" />
          Please wait...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="message" style={{ justifyContent: "center" }}>
        {" "}
        {withProgress && (
          <div>
            <br />
            <ProgressSVG height="200px" progress={progress} />
            <p className="my-2" style={centeredText}>
              {message}
            </p>
          </div>
        )}
        {!withProgress && (
          <div>
            <br />
            <EndlessSVG height="200px" />
            <p className="my-2" style={centeredText}>
              {message}
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <span />
      </Modal.Footer>
    </Modal>
  );
};

export default LongProcessIndicator;
