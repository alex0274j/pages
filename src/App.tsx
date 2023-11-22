import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./layout/header";
import Navigation from "./layout/navigation";
import Taskbar from "./layout/taskbar";
import Home from "./pages/home";
import NotImplemented from "./pages/not-implemented";
import NotFound from "./pages/not-found";
import AccessDenied from "./pages/access-denied";
import ShortProcessIndicator from "./shared/short-process-indicator";
import LongProcessIndicator from "./shared/long-process-indicator";
import TaskbarContextProvider from "./shared/taskbar-context";

import "@progress/kendo-theme-bootstrap/dist/all.css";
import "@minebea/hmi/public/css/minebea-hmi.css";
import "@minebea/hmi/public/js/minebea-hmi";

import "@minebea/hmi/public/js/minebea-controls";

import { config } from "./shared/config";
import { MinebeaInput } from "./types/minebeaInput";
import SessionDialog from "./layout/sessionDialog";

import { storeProps } from "./store";
import About from "./pages/about";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "minebea-input": MinebeaInput;
    }
  }
}

const App = (): JSX.Element | null => {
  const location = useLocation();
  const navigate = useNavigate();
  // const pageParts = location.split("/");
  const PageName = location.pathname;
  const userState = useSelector((state: storeProps) => state.user);

  return (
    <>
      <TaskbarContextProvider>
        <Header />
        <Navigation />
        <div className="container-fluid hmi-content mt-5">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path={`${config.BASE_URL}/`} element={<Home />} />
            <Route
              path={`${config.BASE_URL}/not-implemented`}
              element={<NotImplemented />}
            />
            <Route path={`${config.BASE_URL}/about`} element={<About />} />
            <Route
              path={`${config.BASE_URL}/access-denied`}
              element={<AccessDenied />}
            />
          </Routes>
          <SessionDialog />
          <Taskbar />
        </div>
      </TaskbarContextProvider>
      <ShortProcessIndicator />
      <LongProcessIndicator />
    </>
  );
};

export default App;
