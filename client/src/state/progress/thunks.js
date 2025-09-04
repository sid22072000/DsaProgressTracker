import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setProgress } from "./slice";
import constants from "../../constants.json";

export const fetchProgress = createAsyncThunk(
  "progress/fetchProgress",
  async (_, { dispatch }) => {
    try {
      const res = await axios.get(`${constants.API_BASE_URL}/users/progress`, {
        withCredentials: true,
      });
      let data = res.data;
      // Normalize array to object if needed
      if (Array.isArray(data)) {
        const obj = {};
        data.forEach(({ problemId, completed }) => {
          const id = typeof problemId === "string" ? problemId : problemId._id;
          obj[id] = completed;
        });
        data = obj;
      }
      dispatch(setProgress(data));
    } catch (err) {
      // Optionally handle error
    }
  }
);

export const updateProgress = createAsyncThunk(
  "progress/updateProgress",
  async ({ problemId, completed }, { dispatch }) => {
    try {
      const res = await axios.post(
        `${constants.API_BASE_URL}/users/progress`,
        { problemId, completed },
        { withCredentials: true }
      );
      let data = res.data;
      // Normalize array to object if needed
      if (Array.isArray(data)) {
        const obj = {};
        data.forEach(({ problemId, completed }) => {
          const id = typeof problemId === "string" ? problemId : problemId._id;
          obj[id] = completed;
        });
        data = obj;
      }
      dispatch(setProgress(data));
    } catch (err) {
      // Optionally handle error
    }
  }
);
