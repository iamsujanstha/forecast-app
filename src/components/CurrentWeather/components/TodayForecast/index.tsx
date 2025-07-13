import { Box, Grid, styled, Typography } from "@mui/material";
import BlockHeader from "../../.././shared/BlockHeader";
import dayjs from "dayjs";
import { memo } from "react";
import type { WeatherResponse } from "../../../../types/WeatherResponse";

const StyledWeatherBox = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(189, 189, 189, 0.7)'
    : '#ffffff1a',
  padding: '16px',
  borderRadius: '8px',
  textAlign: 'center',
  color: theme.palette.text.primary, // ensures text color adapts to theme
}));

function TodayForecast({ data }: { data: WeatherResponse }) {
  const hours = data?.forecast?.forecastday[0]?.hour || [];
  const currentTime = dayjs();

  const filteredHours = hours.filter((hour) => {
    return dayjs(hour.time, "YYYY-MM-DD HH:mm").isAfter(currentTime);
  });

  return (
    <>
      <BlockHeader variant="h6" sx={{ marginBottom: "20px" }}>
        Today Forecast
      </BlockHeader>
      <Grid
        container
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "center", marginBottom: '1rem' }}
      >
        {filteredHours.map((hour) => (
          <Grid size={{ xs: 3 }} key={hour.time}>
            <StyledWeatherBox>
              <BlockHeader>{dayjs(hour.time).format("HH:mm")}</BlockHeader>
              <Box
                component={"img"}
                src={`https:${hour.condition.icon}`}
                alt={hour.condition.text}
                sx={{ width: "40px", height: "40px" }}
              />
              <Typography fontWeight={700} sx={{ textTransform: "uppercase" }}>
                {hour.temp_c} &#8451;
              </Typography>
            </StyledWeatherBox>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default memo(TodayForecast);
