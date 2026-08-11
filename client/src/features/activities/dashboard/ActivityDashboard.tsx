import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectedActivity: Activity | null;
  onSelectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  openForm: (id?: string) => void;
  closeForm: () => void;
  editMode: boolean;
};
export default function ActivityDashboard({
  activities,
  selectedActivity,
  onSelectActivity,
  onCancelSelectActivity,
  closeForm,
  openForm,
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
            selectedActivity={selectedActivity}
            onCancelActivity={onCancelSelectActivity}
            onEditActivity={() => openForm(selectedActivity.id)}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            closeForm={closeForm}
            openForm={openForm}
          />
        )}
      </Grid>
    </Grid>
  );
}
