import { Box, Typography, useTheme } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import AirIcon from "@mui/icons-material/Air";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import BlockHeader from "../../../shared/BlockHeader";
import type { CurrentWeather } from "../../../../types/CurrentWeather";

function AirConditions({ current }: { current: CurrentWeather }) {
  const theme = useTheme();

  return (
    <Box>
      <BlockHeader variant="h6">Air conditions</BlockHeader>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              gap: "5px",
            }}
          >
            <DeviceThermostatIcon
              fontSize="small"
              sx={{ color: theme.palette.text.secondary }}
            />
            <BlockHeader>Feel like</BlockHeader>
          </Box>
          <Typography fontWeight={700} sx={{ textTransform: "uppercase" }}>
            {current.feelslike_c} &#8451;
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              gap: "5px",
            }}
          >
            <AirIcon
              fontSize="small"
              sx={{ color: theme.palette.text.secondary }}
            />
            <BlockHeader>Wind</BlockHeader>
          </Box>
          <Typography fontWeight={700} sx={{ textTransform: "uppercase" }}>
            {current.wind_kph} km/h
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              gap: "5px",
            }}
          >
            <CloudIcon
              fontSize="small"
              sx={{ color: theme.palette.text.secondary }}
            />
            <BlockHeader>Clouds</BlockHeader>
          </Box>
          <Typography fontWeight={700} sx={{ textTransform: "uppercase" }}>
            {current.cloud} %
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              gap: "5px",
            }}
          >
            <OpacityIcon
              fontSize="small"
              sx={{ color: theme.palette.text.secondary }}
            />
            <BlockHeader>Humidity</BlockHeader>
          </Box>
          <Typography fontWeight={700} sx={{ textTransform: "uppercase" }}>
            {current.humidity} %
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AirConditions;
