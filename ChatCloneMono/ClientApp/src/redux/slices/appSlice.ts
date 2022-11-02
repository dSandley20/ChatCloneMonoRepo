import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

interface ISnackbar {
  content: "string";
  duration: number;
  variant: string;
  children?: React.ReactNode | null;
}

const appSlice = createSlice({
  name: "app",
  initialState: {
    drawerOpen: false,
    sidebarMargin: "0px",
    snackbarContent: {
      content: "",
      duration: 3000,
      variant: "",
      children: null,
    },
    snackbarOpen: false,
  },
  reducers: {
    changeMargin: (state, action: PayloadAction<string>) => {
      state.sidebarMargin = action.payload;
    },
    populateSnackbar: (state, action: PayloadAction<any>) => {
      state.snackbarContent = action.payload;
    },
    toggleSnackbar: (state, action: PayloadAction<boolean>) => {
      state.snackbarOpen = action.payload;
    },
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
  },
});

export const { changeMargin, populateSnackbar, toggleSnackbar, toggleDrawer } =
  appSlice.actions;

export default appSlice.reducer;
