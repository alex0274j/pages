import React from "react";
import SubHeader from "../layout/subheader";

const NotImplemented = (): JSX.Element => {
  return (
    <>
      <SubHeader header="Error" />
      <div className="row">
        <div className="col hmi-inner-content p-5">
          <b>
            The resource you are looking for has not been implemented. There are plans to
            to this. This is why you see this page.
          </b>
        </div>
      </div>
    </>
  );
};

export default NotImplemented;
