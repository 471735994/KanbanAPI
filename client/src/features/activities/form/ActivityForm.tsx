import {
  AddCircleOutlined,
  CalendarMonth,
  CheckCircle,
  Close,
  EditNote,
  LocationOn,
  Place,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  activity?: Activity | null;
  closeForm: () => void;
  openForm: () => void;
  onSubmitForm: (activity: Activity) => void;
};

export default function ActivityForm({
  activity,
  closeForm,
  onSubmitForm,
}: Props) {
  // 
  const isEditing=false;
  

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) {
      data.id = activity.id;
    }

    onSubmitForm(data as unknown as Activity);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
      <Box sx={{ p: { xs: 3, md: 4 } }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 52,
              height: 52,
              boxShadow: 2,
            }}
          >
            {isEditing ? <EditNote /> : <AddCircleOutlined />}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {isEditing ? "Edit Activity" : "Create Activity"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isEditing
                ? "Update the details of this activity"
                : "Fill in the details below to create a new activity"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid size={12}>
              <TextField
                name="title"
                fullWidth
                label="Title"
                placeholder="e.g. Mountain Hiking Trip"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                placeholder="Tell us more about this activity..."
                multiline
                rows={4}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ mt: -2.5, alignSelf: "flex-start" }}
                      ></InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="category"
                label="Category"
                placeholder="e.g. Music, Sports"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="date"
                label="Date"
                type="date"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="city"
                label="City"
                placeholder="e.g. Beijing"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="venue"
                label="Venue"
                placeholder="e.g. Olympic Park"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Place color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Close />}
              onClick={closeForm}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
