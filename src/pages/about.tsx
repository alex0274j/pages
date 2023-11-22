import React from "react";
import SubHeader from "../layout/subheader";

const About = (): JSX.Element => {


  return (
    <>
     <SubHeader header="About" />
      <div className="row">
        <div className="col hmi-inner-content">
 
          <h2 className="p-2">Fusion Auth</h2>

          <p className="p-2"> Minebea Intec Auth-Application.</p>
          <p className="p-2">This software is an integral part of the Minebea Intec infrastructure and is 
            designed to work seamlessly with Minebea products. Our authentication application 
            provides secure access to Minebea Intec's suite of products and services, 
            ensuring that your data is always protected. 
            With our user-friendly interface and robust security features, 
            you can trust Minebea Intec to keep your information safe and secure.</p>
          <p className="p-2">
            {"Copyright © 2023 "}
            <a href="https://www.minebea-intec.com/">Minebea Intec GmbH</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
