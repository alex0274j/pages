/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountSettings from "./AccountSettings";
import { config } from "../shared/config";
import { storeProps } from "../store";

declare global {
  interface Window {
    toggleHmiMenu(event?: EventTarget): void;
    openUserMenu(): void;
  }
}

let interval: NodeJS.Timer;

// eslint-disable-next-line @typescript-eslint/ban-types
const Header = (props: any): JSX.Element => {
  const [localizeDateTime, setLocalizeDateTime] = useState(["", ""]);
  const username = useSelector((state: storeProps) => state.user.username);

  const getDateTimeString = (curLocale: string): void => {
    const d = new Date();

    const currentTime = d.toLocaleTimeString(curLocale, { timeStyle: "medium" });
    const currentDate = d.toLocaleDateString(curLocale, { dateStyle: "short" });

    setLocalizeDateTime([currentDate, currentTime]);
  };

  useEffect(() => {
    const BrowserLocale = new Intl.NumberFormat().resolvedOptions().locale;

    getDateTimeString(BrowserLocale);

    interval = setInterval(() => {
      getDateTimeString(BrowserLocale);
    }, 1000);

    return (): void => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header>
      <nav className="hmi-header navbar navbar-dark fixed-top bg-hmiblue">
        <ul className="nav">
          <li className="hmi-header-list-item">
            <button
              className="btn btn-no-focus hmi-btn-menu clicked"
              type="button"
              onClick={(element): void => {
                if (element.isTrusted) {
                  window.toggleHmiMenu(element.target);
                }
              }}
            >
              <span className="navbar-toggler-icon" />
              <span className="icon icon-close" />
            </button>
          </li>
          <li className="hmi-header-list-item position-relative">
            <span className="icon icon-warning" style={{ opacity: 0.3 }} />
          </li>
        </ul>
        <ul className="nav float-end">
          <li
            className="hmi-header-list-item-end"
            style={{ width: "auto", cursor: "pointer" }}
          >
            <div onClick={(): void => window.openUserMenu()} aria-hidden="true">
              <div id="operator_coloumn" className="d-flex">
                <span className="icon icon-user" />
                <div className="flex-column">
                  <span className="header-text ps-1">
                    <b>{username || "Operator"}</b>
                  </span>
                  <span className="header-text ps-2">EN</span>
                </div>
              </div>
              <div id="operator_coloumn_close" className="hidden">
                <span
                  style={{
                    margin: "auto",
                    display: "block",
                    top: "10px",
                    position: "relative"
                  }}
                  className="icon icon-close-dark"
                />
              </div>
            </div>
            <AccountSettings {...props} />
          </li>
          <li className="hmi-header-list-item-end clock">
            <span style={{ color: "white" }}>
              <b>{localizeDateTime[0]}</b> {localizeDateTime[1]}
            </span>
          </li>
          <li className="hmi-header-list-item-end">
            <span className="icon icon-central" style={{ opacity: 0.3 }} />
          </li>
          <li className="hmi-header-list-item-end px-2">
            <img
              width="110px"
              src={`${config.BASE_URL}/intec-logo-white.svg`}
              alt="Minebea Intec"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
