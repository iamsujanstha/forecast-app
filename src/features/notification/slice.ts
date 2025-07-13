import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  message: string;
  severity: "error" | "info" | "success" | "warning";
  open: boolean;
}

const initialState: NotificationState = {
  message: "",
  severity: "info",
  open: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: NotificationState["severity"];
      }>
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
      state.open = true;
    },
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
