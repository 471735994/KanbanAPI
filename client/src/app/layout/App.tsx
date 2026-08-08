import { Box, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));

    return () => {};
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id) || null);
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(null);
  };

  // 实现打开表单的逻辑
  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };

  // 实现关闭表单的逻辑
  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleSubmitActivity = (activity: Activity) => {
    setActivities((prev) => {
      const exists = prev.some((x) => x.id === activity.id);
      if (exists) {
        return prev.map((x) => (x.id === activity.id ? activity : x));
      }
      return [...prev, activity];
    });
    setSelectedActivity(null);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          onSelectActivity={handleSelectActivity}
          onCancelSelectActivity={handleCancelSelectActivity}
          onSubmitActivity={handleSubmitActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
        />
      </Container>
    </Box>
  );
}

export default App;
