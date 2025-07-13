import { Button, Snackbar } from "@mui/material";
import { memo } from "react";

type SnackbarRemovedCityProps = {
  snackbarOpen: boolean;
  handleUndo: () => void;
  handleSnackbarOpen: (open: boolean) => void;
};

function SnackbarRemovedCity({
  snackbarOpen,
  handleUndo,
  handleSnackbarOpen,
}: SnackbarRemovedCityProps) {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={() => handleSnackbarOpen(false)}
      message="City removed from history"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      action={
        <Button color="error" size="small" onClick={handleUndo}>
          UNDO
        </Button>
      }
    />
  );
}

export default memo(SnackbarRemovedCity);
