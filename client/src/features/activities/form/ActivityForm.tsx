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
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
  

  const navigate = useNavigate();

  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  const isEditing = activity ? true : false;
  // 提交表单
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单默认提交行为
    const formData = new FormData(event.currentTarget); // 获取表单数据
    const data: { [key: string]: FormDataEntryValue } = {}; // 存储表单数据
    // 遍历表单数据
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity); // 提交表单数据
      navigate(`/activities/${activity.id}`);
    } else {
      await createActivity.mutateAsync(data as unknown as Activity, {
        onSuccess: (id: string) => {
          navigate(`/activities/${id}`);
        },
      });
    }
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
                defaultValue={activity?.title}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              ></TextField>
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                placeholder="Tell us more about this activity..."
                defaultValue={activity?.description}
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
                defaultValue={activity?.category}
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
                defaultValue={
                  activity?.date
                    ? new Date(activity.date).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
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
                defaultValue={activity?.city}
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
                defaultValue={activity?.venue}
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
              onClick={() => navigate("/activities")}
              variant="outlined"
              color="inherit"
              startIcon={<Close />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={updateActivity.isPending || createActivity.isPending}
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
