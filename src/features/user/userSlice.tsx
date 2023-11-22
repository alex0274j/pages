/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  token?: string;
  lastAccess?: number;
  sessionExpired?: boolean;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    lastAccess: Date.now(),
    token: "",
    sessionExpired: false
  } as UserState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    resetUsername: (state) => {
      state.username = "";
    },
    setLastAccess: (state, action) => {
      state.lastAccess = action.payload;
    },
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.sessionExpired = false;
    },
    logoutUser: (state) => {
      state.username = "";
      state.token = "";
    },
    refreshToken: (state, action) => {
      state.token = action.payload;
    },
    setSessionExpired: (state) => {
      state.sessionExpired = true;
    }
  }
});

// Action creators are generated for each case reducer function

export const {
  setUsername,
  setLastAccess,
  setUser,
  resetUsername,
  logoutUser,
  refreshToken,
  setSessionExpired
} = userSlice.actions;

export default userSlice.reducer;
