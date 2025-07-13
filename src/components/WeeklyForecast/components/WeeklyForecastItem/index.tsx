import { Box, styled, Typography, useTheme } from "@mui/material";
import type { ForecastDay } from "../../../../types/Forecast";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import dayjs from "dayjs";

const StyledWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #ffffff1a;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

function WeeklyForecastItem({ item }: { item: ForecastDay }) {
  const { date, day } = item;
  const theme = useTheme();

  return (
    <StyledWrapper>
      <Typography fontWeight={700}>{dayjs(date).format("ddd")}</Typography>
      <Box
        component={"img"}
        src={`https:${day.condition.icon}`}
        alt={day.condition.text}
        sx={{ width: "40px", height: "40px" }}
      />
      <StyledBox>
        <ThunderstormIcon
          fontWeight={700}
          sx={{ color: theme.palette.text.secondary }}
        />
        <Typography fontWeight={700}>{day.daily_chance_of_rain} %</Typography>
      </StyledBox>
      <StyledBox>
        <Typography
          fontWeight={700}
          sx={{ color: theme.palette.text.secondary }}
        >
          H:
        </Typography>
        <Typography fontWeight={700}>{day.maxtemp_c}</Typography>
      </StyledBox>
      <StyledBox>
        <Typography
          fontWeight={700}
          sx={{ color: theme.palette.text.secondary }}
        >
          L:
        </Typography>
        <Typography fontWeight={700}>{day.mintemp_c}</Typography>
      </StyledBox>
    </StyledWrapper>
  );
}

export default WeeklyForecastItem;
