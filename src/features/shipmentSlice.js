import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch shipments from backend
export const fetchShipments = createAsyncThunk("shipments/fetchShipments", async () => {
  const response = await axios.get("http://localhost:5000/api/shipments");
  return response.data;
});

const shipmentSlice = createSlice({
  name: "shipments",
  initialState: { shipments: [], loading: false, error: null },
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(fetchShipments.pending, (state) => { state.loading = true; });
    builder.addCase(fetchShipments.fulfilled, (state, action) => {
      state.loading = false;
      state.shipments = action.payload;
    });
    builder.addCase(fetchShipments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default shipmentSlice.reducer;
