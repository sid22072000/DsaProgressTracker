import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chapters: [],
  loading: false,
  error: null,
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setChapters, setLoading, setError } = sheetSlice.actions;
export default sheetSlice.reducer;
