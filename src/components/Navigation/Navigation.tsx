import { Link, useLocation } from 'react-router-dom';
import { Button, Box } from '@mui/material';

export default function Navigation() {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, position: "absolute", right: 0, top: "-15px" }}>
      {location.pathname === '/weekly-forecast' ?
        <Button component={Link} to="/" variant="outlined">
          Back To Current Forecast
        </Button>
        : <Button component={Link} to="/weekly-forecast" variant="outlined">
          View Weekly Forecast
        </Button>
      }
    </Box>
  );
}