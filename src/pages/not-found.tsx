import React from "react";
import { Link } from "react-router-dom";
import SubHeader from "../layout/subheader";

const NotFound = (): JSX.Element => {

  return (
    <>
      <SubHeader header="Error" />
      <div className="row">
        <div className="col hmi-inner-content p-5">
          <h1>404 - Not Found!</h1>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
