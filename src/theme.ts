import { createTheme } from "@mui/material";

export const getTheme = (mode: 'light' | 'dark') => {
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return createTheme(theme, {
    typography: {
      // your typography settings
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          :root {
            --body-bg-gradient: ${mode === 'dark'
            ? 'linear-gradient(-35deg, #000428 0%, #004e92)'
            : 'linear-gradient(-35deg, #e0f7fa 0%, #80deea)'};
          }
          body {
            background: var(--body-bg-gradient);
            background-attachment: fixed;
            min-height: 100vh;
            margin: 0;
          }
        `,
      },
    },
  });
};