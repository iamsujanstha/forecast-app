import { Box, Container, IconButton, ThemeProvider, styled, CssBaseline } from "@mui/material"
import { getTheme } from "./theme";
import SearchHistory from "./components/SearchHistory/SearchHistory";
import CurrentWeather from "./components/CurrentWeather";
import WeeklyForecast from "./components/WeeklyForecast";
import { CityProvider } from "./context/CityProvider";
import NotificationAlert from "./components/shared/NotificationAlert";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const StyledContainer = styled(Container)(() => ({
  minHeight: '100vh',
  alignItems: 'center',
  display: 'flex',
  padding: '20px'
}));

const StyledWrapper = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: 16,
  width: '100%',
  minHeight: 500,
  backgroundColor: theme.palette.background.paper,
}));

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = useMemo(() => getTheme(mode), [mode]);

  // Set body background based on theme mode
  useEffect(() => {
    document.body.style.background = mode === 'dark'
      ? 'linear-gradient(-35deg, #000428 0%, #004e92)'
      : 'linear-gradient(-35deg, #e0f7fa 0%, #80deea)';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';

    return () => {
      document.body.style.background = '';
      document.body.style.backgroundAttachment = '';
    };
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <CityProvider>
          <NotificationAlert />
          <StyledContainer>
            <StyledWrapper>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={toggleColorMode} color="inherit">
                  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
              <SearchHistory />
              <Routes>
                <Route path="/" element={<CurrentWeather />} />
                <Route path="/weekly-forecast" element={<WeeklyForecast />} />
              </Routes>
            </StyledWrapper>
          </StyledContainer>
        </CityProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;