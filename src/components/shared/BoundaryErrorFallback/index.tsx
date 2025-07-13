import { Alert, AlertTitle, Snackbar } from "@mui/material";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

function BoundaryErrorFallback({ error }: Props) {
  return (
    <Snackbar
      open={!!error}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity="error" variant="filled">
        <AlertTitle>{error.message}</AlertTitle>
      </Alert>
    </Snackbar>
  );
}

export default BoundaryErrorFallback;
