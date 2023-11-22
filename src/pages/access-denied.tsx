import React from "react";
import SubHeader from "../layout/subheader";

const AccessDenied = (): JSX.Element => {
  return (
    <>
      <SubHeader header="Access denied" />
      <div className="row">
        <div className="col hmi-inner-content">
          You do not have permission to view this directory or page.
        </div>
      </div>
    </>
  );
};

export default AccessDenied;
