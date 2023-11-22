import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import userSlice from "./features/user/userSlice";
import spinnerSlice from "./features/spinner/spinnerSlice";

const persistConfig = {
  key: "auth",
  storage: sessionStorage,
  whitelist: ["user", "setup"]
};

export interface storeProps {
  spinner: {
    value: string;
    message: string;
    progress: number;
    withProgress: boolean;
    withClose: boolean;
    withOK: boolean;
  };
  user: {
    username: string;
    lastAccess: Date;
    token: string;
    sessionExpired: boolean;
  };
}

const reducers = combineReducers({
  user: userSlice,
  spinner: spinnerSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
