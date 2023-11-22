import { extendedGridColumnProps } from "@minebea/react-grid-extension";
import React, { useEffect, useState } from "react";

interface InlineDetailViewProps {
  header?: string;
  data: Record<string, any>;
  gridColumns: Array<extendedGridColumnProps>;
  onClose?: () => void;
}

function close(callBack?: () => void): void {
  const element = document.getElementsByClassName("inline-detail-view")[0] as HTMLElement;

  element.style.width = "0";
  element.style.minWidth = "0";
  setTimeout(() => {
    callBack?.();
  }, 400);
}

function open(): void {
  const element = document.getElementsByClassName("inline-detail-view")[0] as HTMLElement;

  element.style.minWidth = "400px";
}

const InlineDetailView = ({
  data,
  gridColumns,
  onClose,
  header
}: InlineDetailViewProps): JSX.Element => {
  const [detailData, setDetailData] = useState<
    { value: string | boolean; label: string }[]
  >([]);

  useEffect(() => {
    const dataBuffer: {
      value: string | boolean;
      label: string;
    }[] = [];

    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        gridColumns.some((item: extendedGridColumnProps) => item.field === key)
      ) {
        let value = data[key];

        if (value === undefined || value === null || value === "") {
          value = "-";
        }
        if (typeof value !== "string") {
          value = value.toString();
        }

        dataBuffer.push({
          value,
          label: key
        });
      }
    }
    setDetailData(dataBuffer);

    open();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="inline-detail-view">
      <div className="detail-header">
        {header !== undefined ? header : data[gridColumns[0].field || ""]}
        <button
          type="button"
          className="detail-close-button"
          onClick={(): void => close(onClose)}
        >
          <span className="icon icon-close-dark" />
        </button>
      </div>
      <div className="detail-body">
        <div
          className="col hmi-inner-content parameter-page no-padding"
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          {detailData.map((item: any): JSX.Element => {
            return (
              <div key={item.label} className="row">
                <div className="col-12">
                  <div className="inner wc">
                    <div
                      className="detail-parameter-large"
                      style={{ display: "flex", alignItems: "start" }}
                    >
                      <div className="detail-info-header" style={{ width: "50%" }}>
                        {item.label}
                      </div>
                      <div className="detail-info">
                        <p>{item.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

InlineDetailView.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: (): void => {},
  header: undefined
};

export default InlineDetailView;
