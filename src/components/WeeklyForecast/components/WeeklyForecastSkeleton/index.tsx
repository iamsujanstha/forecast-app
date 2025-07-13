import { Box, styled, Skeleton, Typography } from "@mui/material";
import BlockHeader from "../../../shared/BlockHeader";

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  row-gap: 20px;
`;

const StyledWrapperItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #ffffff1a;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
`;

function WeeklyForecastSkeleton() {
  return (
    <>
      <BlockHeader variant="h6">Weekly Forecast</BlockHeader>
      <StyledWrapper>
        {[...Array(5)].map((_, i) => (
          <StyledWrapperItem key={i}>
            <Skeleton variant="text" width={30} />
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width={30} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography sx={{ visibility: "hidden" }}>H:</Typography>
              <Skeleton variant="text" width={30} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography sx={{ visibility: "hidden" }}>L:</Typography>
              <Skeleton variant="text" width={30} />
            </Box>
          </StyledWrapperItem>
        ))}
      </StyledWrapper>
    </>
  );
}

export default WeeklyForecastSkeleton;
