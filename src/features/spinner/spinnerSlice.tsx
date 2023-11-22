/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState: {
    value: "",
    message: "",
    progress: 0,
    withProgress: true,
    withClose: false,
    withOK: false
  },
  reducers: {
    spi: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.value = "spi";
      state.message = action.payload;
    },
    lpi: (
      state,
      action: PayloadAction<{
        message?: string;
        progress?: number;
        withProgress?: boolean;
        withClose?: boolean;
        withOK?: boolean;
      }>
    ) => {
      state.value = "lpi";
      state.message = action.payload.message === undefined ? "" : action.payload.message;
      state.progress = action.payload.progress === undefined ? 0 : action.payload.progress;
      state.withProgress =
        action.payload.withProgress === undefined ? true : action.payload.withProgress;
      state.withClose =
        action.payload.withClose === undefined ? false : action.payload.withClose;
      state.withOK = action.payload.withOK === undefined ? false : action.payload.withOK;
    },
    off: (state) => {
      state.value = "";
      state.message = "";
    }
  }
});

// Action creators are generated for each case reducer function

export const { spi, lpi, off } = spinnerSlice.actions;

export default spinnerSlice.reducer;
