import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../../../features/notification/slice";
import { notificationSelector } from "../../../features/notification/selectors";

function NotificationAlert() {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(notificationSelector);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default NotificationAlert;
