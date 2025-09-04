import { setChapters } from "./slice";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../constants.json";

export const fetchChapters = createAsyncThunk(
  "sheet/fetchSheetAndProgress",
  async (_, { dispatch }) => {
    try {
      const chaptersRes = await axios.get(
        `${constants.API_BASE_URL}/chapters`,
        {
          withCredentials: true,
        }
      );
      dispatch(setChapters(chaptersRes.data));
      // Progress fetching logic moved to progress thunk
    } catch (err) {
      // Optionally handle error
    }
  }
);
