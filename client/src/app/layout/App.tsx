import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  // 使用useState来管理编辑模式
  const [editMode, setEditMode] = useState(false);

  // 获取活动列表,使用自定义hooks来获取活动列表
  const { activities, isPending } = useActivities();

  // 实现点击活动列表项的逻辑
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((x) => x.id === id) || null);
    // 点击 View 时退出编辑模式，进入查看模式
    setEditMode(false);
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

  // 实现编辑表单的逻辑


  

  const handleDeleteActivity = (id: string) => {
    // setActivities((prev) => prev.filter((x) => x.id !== id)); // 删除活动
    console.log(id);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            onSelectActivity={handleSelectActivity}
            onCancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            onDeleteActivity={handleDeleteActivity}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
