import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  progress: {},
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProgress, setLoading, setError } = progressSlice.actions;
export default progressSlice.reducer;
