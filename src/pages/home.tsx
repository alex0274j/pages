import React from "react";
import SubHeader from "../layout/subheader";

const Home = (): JSX.Element => {
  return (
    <>
      <SubHeader header="Home" />
      <div className="row">
        <div className="col hmi-inner-content">
          <h2 className="p-2">
            <p>welcome</p>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Home;
