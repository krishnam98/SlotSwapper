import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../API/axios";
const getSwappableSlots = createAsyncThunk(
  "swaps/getswappableSlots",
  async () => {
    const res = await API.get("api/swappableSlots");
    return res.data;
  }
);

const requestSwap = createAsyncThunk("swaps/requestSwap", async (data) => {
  const res = await API.post("api/swap-request", data);
  return res.data;
});

const respondSwap = createAsyncThunk("swaps/respondSwap", async (data) => {
  const res = await API.post("api/swap-response/" + data.requestId, {
    accept: data.accept,
  });
  return res.data;
});

const getIncomingRequests = createAsyncThunk(
  "requests/getIncomingRequests",
  async () => {
    const res = await API.get("requests/getIncomingRequests");
    return res.data;
  }
);

const getOutgoingRequests = createAsyncThunk(
  "requests/getOutgoingRequests",
  async () => {
    const res = await API.get("requests/getOutgoingRequests");
    return res.data;
  }
);

const SwapSlice = createSlice({
  name: "swaps",
  initialState: {
    swappables: [],
    incomingRequests: [],
    outgoingRequests: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSwappableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSwappableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.swappables = action.payload;
      })
      .addCase(getSwappableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(requestSwap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestSwap.fulfilled, (state, action) => {
        state.loading = false;
        state.outgoingRequests.push(action.payload);
        const index = state.swappables.findIndex(
          (slot) => slot._id === action.payload.theirSlot
        );
        state.swappables.splice(index, 1);
      })
      .addCase(requestSwap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(respondSwap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(respondSwap.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(respondSwap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIncomingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIncomingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.incomingRequests = action.payload;
      })
      .addCase(getIncomingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOutgoingRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOutgoingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.outgoingRequests = action.payload;
      })
      .addCase(getOutgoingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export {
  getSwappableSlots,
  requestSwap,
  respondSwap,
  getIncomingRequests,
  getOutgoingRequests,
};
export default SwapSlice.reducer;
