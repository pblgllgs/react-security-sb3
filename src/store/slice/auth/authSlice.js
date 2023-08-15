import { createSlice } from "@reduxjs/toolkit";

const initialLogin = {
  isEnabled: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialLogin,
  reducers: {
    onLogin: (state, { payload }) => {
      state.isEnabled = true;
      state.user = payload.user;
    },
    onLogout: (state) => {
      state.isEnabled = false;
      state.user = undefined;
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;
