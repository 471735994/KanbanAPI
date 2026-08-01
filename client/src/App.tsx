import { ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <>
      <Typography className="app" style={{ color: "red" }}>
        Reactivities
      </Typography>
      <ul>
        {activities.map((activity) => (
          <ListItem key={activity.id}>{activity.title}</ListItem>
        ))}
      </ul>
    </>
  );
}

export default App;
