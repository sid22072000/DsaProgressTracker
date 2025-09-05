import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutSlice, setError, setLoading, setUser } from "./slice";
import axios from "axios";
import constants from "../../constants.json";

export const login = createAsyncThunk(
  "auth/loginThunk",
  async ({ email, password }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        `${constants.API_BASE_URL}/users/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUser(res.data));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setUser(null));
      dispatch(setError(err.response?.data?.error || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        `${constants.API_BASE_URL}/users/register`,
        payload,
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(res.data));
      dispatch(setError(null));
      return res.data;
    } catch (err) {
      dispatch(setUser(null));
      dispatch(setError(err.response?.data?.error || "Registration failed"));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`${constants.API_BASE_URL}/users/me`, {
      withCredentials: true,
    });
    dispatch(setUser(res.data));
    dispatch(setError(null));
    return res.data;
  } catch (err) {
    dispatch(setUser(null));
    dispatch(setError("Failed to fetch user info"));
    return null;
  } finally {
    dispatch(setLoading(false));
  }
});

export const logout = createAsyncThunk(
  "auth/logoutThunk",
  async (navigate, { dispatch }) => {
    try {
      await axios.post(
        `${constants.API_BASE_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logoutSlice());
      if (navigate) navigate("/login");
    } catch (err) {
      // Optionally handle error
    }
  }
);
