import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./features/shipmentSlice";

export const store = configureStore({
  reducer: {
    shipments: shipmentReducer,
  },
});
