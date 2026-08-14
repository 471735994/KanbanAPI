import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { formatDate } from "../../../lib/util/util";

export default function ActivityDetailsInfo() {
  const { id } = useParams();
  const { activity } = useActivities(id);
  if (!activity) return null;

  return (
    <Paper sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", pl: 2, py: 1 }}>
        <Box sx={{ width: 32, display: "flex", justifyContent: "center" }}>
          <Info color="info" fontSize="large" />
        </Box>
        <Typography>{activity.description}</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center", pl: 2, py: 1 }}>
        <Box sx={{ width: 32, display: "flex", justifyContent: "center" }}>
          <CalendarToday color="info" fontSize="large" />
        </Box>
        <Typography>{formatDate(activity.date)}</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", alignItems: "center", pl: 2, py: 1 }}>
        <Box sx={{ width: 32, display: "flex", justifyContent: "center" }}>
          <Place color="info" fontSize="large" />
        </Box>
        <Typography>
          {activity.venue}, {activity.city}
        </Typography>
      </Box>
    </Paper>
  );
}
