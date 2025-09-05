import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  registerSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSlice: (state) => {
      state.user = null;
      state.registerSuccess = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setRegisterSuccess: (state, action) => {
      state.registerSuccess = action.payload;
    },
  },
});

export const {
  logoutSlice,
  setUser,
  setLoading,
  setError,
  setRegisterSuccess,
} = authSlice.actions;
export default authSlice.reducer;
