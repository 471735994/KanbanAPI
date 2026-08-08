import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectedActivity: Activity | null;
  onSelectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  onSubmitActivity: (activity: Activity) => void;
  openForm: () => void;
  closeForm: () => void;
  editMode:boolean;
};
export default function ActivityDashboard({
  activities,
  selectedActivity,
  onSelectActivity,
  onCancelSelectActivity,
  onSubmitActivity,
  closeForm,
  editMode,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          onSelectActivity={onSelectActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            onCancelActivity={onCancelSelectActivity}

          />
        )}
        {
          editMode &&
        <ActivityForm
          activity={selectedActivity}
          onSubmit={onSubmitActivity}
          closeForm={closeForm}
        />
        }
      </Grid>
    </Grid>
  );
}
