import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API/axios";
import { createSlice } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    const res = await API.post("/auth/signup", data);

    return res.data;
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const res = await API.post("/auth/login", data);
  return res.data;
});

const initialState = {
  user: JSON.parse(localStorage.getItem("userKey")) || null,
  token: localStorage.getItem("tokenKey") || null,
  loading: false,
  success: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("tokenKey");
      localStorage.removeItem("userKey");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("tokenKey", action.payload.token);
        localStorage.setItem("userKey", JSON.stringify(action.payload.user));
        state.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("tokenKey", action.payload.token);
        localStorage.setItem("userKey", JSON.stringify(action.payload.user));
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
