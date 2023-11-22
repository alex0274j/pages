import React from "react";
import { render,  screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "../../features/spinner/spinnerSlice";
import userSlice from "../../features/user/userSlice";
import TaskbarContextProvider from "../../shared/taskbar-context";
import Taskbar from "../../layout/taskbar";
import LongProcessIndicator from "../../shared/long-process-indicator";

function createMockStore(user: string): any {
  const reducer = {
    spinner: spinnerSlice,
    user: userSlice,
  };

  const store = configureStore({
    reducer,
    preloadedState: {
      spinner: {
        message: "testnachricht",
        value: "lpi",
        withProgress: true,
        progress: 0,
        withClose: false,
        withOK: false
      },
      user: { username: user },
    }
  });

  return store;
}

const store = createMockStore("");

describe("LongProcessIndicator", () => {
  it("should render the LongProcessIndicator", () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    render(
      <BrowserRouter>
        <Provider store={store}>
          <TaskbarContextProvider>
            <div className="container-fluid hmi-content mt-5">
              <LongProcessIndicator />
              <Taskbar />
            </div>
          </TaskbarContextProvider>
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("testnachricht")).toBeInTheDocument();
  });
});
