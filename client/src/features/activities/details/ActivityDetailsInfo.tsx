import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { formatDate } from "../../../lib/util/util";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";

export default function ActivityDetailsInfo() {
  const { id } = useParams();
  const { activity } = useActivities(id);
  const [mapOpen, setMapOpen] = useState(false);

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pl: 2,
          py: 1,
        }}
      >
        <Box sx={{ width: 32, display: "flex", justifyContent: "center" }}>
          <Place color="info" fontSize="large" />
        </Box>
        <Typography>
          {activity.venue}, {activity.city}
        </Typography>
        <Button onClick={() => setMapOpen(!mapOpen)}>Show map</Button>
      </Box>
      {mapOpen && (
        <Box sx={{ height: 300, zIndex: 1000, borderRadius: 3 }}>
          <MapComponent
            position={[activity.latitude, activity.longitude]}
            venue={activity.venue}
          />
        </Box>
      )}
    </Paper>
  );
}
