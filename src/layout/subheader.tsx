import React from "react";

type Props = {
  header: string;
};

const SubHeader = (props: Props): JSX.Element => {
  const { header } = props;

  return (
    <div className="row subheader">
      <div className="col">
        <span>{header}</span>
        <span className="icon icon-help-grey float-end" style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default SubHeader;
