import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./features/spinner/spinnerSlice";
import userSlice from "./features/user/userSlice";
import TaskbarContextProvider from "./shared/taskbar-context";
import Taskbar from "./layout/taskbar";

function createMockStore(user: string): any {
  const reducer = {
    spinner: spinnerSlice,
    user: userSlice,
  };

  const store = configureStore({
    reducer,
    preloadedState: { user: { username: user },  }
  });

  return store;
}

const store = createMockStore("");

const AllTheProviders2 = ({ children }: { children: React.ReactNode }): any => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <TaskbarContextProvider>
          <div className="container-fluid hmi-content mt-5">
            {children}
            <Taskbar />
          </div>
        </TaskbarContextProvider>
      </Provider>
    </BrowserRouter>
  );
};

const customRender2 = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">): any =>
  render(ui, { wrapper: AllTheProviders2, ...options });

export * from "@testing-library/react";
export { customRender2 as render };
