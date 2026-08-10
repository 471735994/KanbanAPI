import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectedActivity: Activity | null;
  onSelectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  onSubmitForm: (activity: Activity) => void;
  openForm: () => void;
  closeForm: () => void;
  editMode: boolean;
  onDeleteActivity: (id: string) => void;
};
export default function ActivityDashboard({
  activities,
  selectedActivity,
  onSelectActivity,
  onCancelSelectActivity,
  onSubmitForm,
  closeForm,
  openForm,
  editMode,
  onDeleteActivity,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          onSelectActivity={onSelectActivity}
          onDeleteActivity={onDeleteActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            onCancelActivity={onCancelSelectActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            onSubmitForm={onSubmitForm}
            closeForm={closeForm}
            openForm={openForm}
          />
        )}
      </Grid>
    </Grid>
  );
}
