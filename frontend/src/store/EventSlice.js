import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API/axios";
import { createSlice } from "@reduxjs/toolkit";

const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await API.get("events/getMyEvents");
  console.log(res);
  return res.data;
});

const createEvent = createAsyncThunk("events/createEvent", async (data) => {
  const res = await API.post("events/create", data);
  return res.data;
});

const updateEvent = createAsyncThunk("events/updateEvent", async (data) => {
  const res = await API.put("events/update/" + data.id, data.payload);
  return res.data;
});

const EventSlice = createSlice({
  name: "events",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items.splice(index, 1);
        }
        state.items.unshift(action.payload);
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchEvents, createEvent, updateEvent };
export default EventSlice.reducer;
