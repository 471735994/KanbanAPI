import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default function ActivityDetailPage() {
  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading...</Typography>;
  if (!activity) return <Typography>Activity not found</Typography>;

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
      <Box sx={{ flex: 8 }}>
        <ActivityDetailsHeader />
        <ActivityDetailsInfo />
        <ActivityDetailsChat />
      </Box>
      <Box sx={{ flex: 4 }}>
        <ActivityDetailsSidebar />
      </Box>
    </Box>
  );
}
