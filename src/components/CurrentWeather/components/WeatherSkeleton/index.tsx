import { Box, Grid, Skeleton } from "@mui/material";
import BlockHeader from "../../../shared/BlockHeader";

function WeatherSkeleton() {
  return (
    <>
      {/* 📍 Current Weather */}
      <Box sx={{ mb: 4 }}>
        <BlockHeader variant="h6">Current Weather</BlockHeader>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {[1, 2, 3].map((_, i) => (
            <Box key={i} sx={{ textAlign: "center" }}>
              <Skeleton width={60} height={24} />
              <Skeleton width={40} height={16} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* 🌬️ Air Conditions */}
      <Box sx={{ mb: 4 }}>
        <BlockHeader variant="h6">Air conditions</BlockHeader>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {[1, 2, 3, 4].map((_, i) => (
            <Box key={i} sx={{ textAlign: "center" }}>
              <Skeleton width={40} height={20} />
              <Skeleton width={50} height={24} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* 📅 Today Forecast */}
      <Box>
        <BlockHeader variant="h6" sx={{ marginBottom: "20px" }}>
          Today Forecast
        </BlockHeader>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          {[...Array(6)].map((_, i) => (
            <Grid size={{ xs: 3 }} key={i}>
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#ffffff1a",
                  padding: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Skeleton width={40} height={20} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton width={30} height={24} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default WeatherSkeleton;
