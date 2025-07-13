import { isRejectedWithValue, type Middleware, type MiddlewareAPI } from "@reduxjs/toolkit";
import { showNotification } from "../features/notification/slice";
import type { ApiError } from "../types/ApiError";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      let message = "Samething went wrong";
		console.error("RTK Query Error:", action);
      if (action.payload && typeof action.payload === "object") {
        message = (action.payload as ApiError).data.error.message || message;
      } else if (action.error) {
        message = action.error.message || message;
      }
      api.dispatch(showNotification({ message, severity: "error" }));
    }

    return next(action);
  };
