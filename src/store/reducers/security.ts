import { createSlice } from '@reduxjs/toolkit';

export type securityState = {
  timeLoggedOut: number;
  sessionTimeout: number;
  biometricsAllowed: boolean;
};

const initialState: securityState = {
  timeLoggedOut: Date.now(),
  sessionTimeout: 10,
  biometricsAllowed: false,
};

export const securitySlice = createSlice({
  name: 'security',
  initialState,

  reducers: {
    setTimeLoggedOut: (state, action) => {
      state.timeLoggedOut = action.payload;
    },
    setSessionTimeout: (state, action) => {
      state.sessionTimeout = action.payload;
    },
    setBiometricsAllowed: (state, action) => {
      state.biometricsAllowed = action.payload;
    },
    resetSecuritySettings: () => {
      initialState;
    },
  },
});

export const { setTimeLoggedOut, setSessionTimeout, setBiometricsAllowed, resetSecuritySettings } = securitySlice.actions;
export default securitySlice.reducer;
