import { Box, Typography, useTheme } from "@mui/material";
import BlockHeader from "../../../shared/BlockHeader";
import dayjs from "dayjs";
import type { WeatherResponse } from "../../../../types/WeatherResponse";

function Details({ data }: { data: WeatherResponse }) {
  const theme = useTheme();
  const { current, location, forecast } = data;
  const forecastday = forecast?.forecastday[0]?.day;

  return (
    <Box>
      <BlockHeader variant="h6">Current Weather</BlockHeader>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography fontWeight={700} sx={{ textTransform: "uppercase" }}>
            {location.name}
          </Typography>
          <Typography color={theme.palette.text.secondary} variant="subtitle2">
            {dayjs(location.localtime).format("DD MMM")}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography fontWeight={700} sx={{ textTransform: "uppercase" }}>
            {current.temp_c} &#8451;
          </Typography>
          <Typography color={theme.palette.text.secondary} variant="subtitle2">
            H: {forecastday.maxtemp_c} L: {forecastday.mintemp_c}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box
            component={"img"}
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            sx={{ width: "50px", height: "50px", marginBottom: "-10px" }}
          />
          <Typography color={theme.palette.text.secondary} variant="subtitle2">
            {current.condition.text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Details;