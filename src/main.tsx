import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline } from "@mui/material";
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ErrorBoundary } from 'react-error-boundary';
import BoundaryErrorFallback from './components/shared/BoundaryErrorFallback/index.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={BoundaryErrorFallback}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
