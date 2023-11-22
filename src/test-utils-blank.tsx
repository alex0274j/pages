import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ShortProcessIndicator from "./shared/short-process-indicator";
import spinnerSlice from "./features/spinner/spinnerSlice";
import userSlice from "./features/user/userSlice";

function createMockStore(user: string): any {
  const reducer = {
    spinner: spinnerSlice,
    user: userSlice
  };

  const store = configureStore({ reducer, preloadedState: { user: { username: user } } });

  return store;
}

const store = createMockStore("");

const AllTheProviders = ({ children }: { children: React.ReactNode }): any => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {children}
        <ShortProcessIndicator />
      </Provider>
    </BrowserRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">): any =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
