import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Divider, Paper, Typography } from "@mui/material";

export default function ActivityDetailsInfo() {
  return (
    <Paper sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", pl: 2, py: 1 }}>
        <Box sx={{ width: 32, display: "flex", justifyContent: "center" }}>
          <Info color="info" fontSize="large" />
        </Box>
        <Typography>Activity description</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center", pl: 2, py: 1 }}>
        <Box sx={{ width: 32, display: "flex", justifyContent: "center" }}>
          <CalendarToday color="info" fontSize="large" />
        </Box>
        <Typography>1 Jan 2025 at 1:40pm</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center", pl: 2, py: 1 }}>
        <Box sx={{ width: 32, display: "flex", justifyContent: "center" }}>
          <Place color="info" fontSize="large" />
        </Box>
        <Typography>Venue, City</Typography>
      </Box>
    </Paper>
  );
}
