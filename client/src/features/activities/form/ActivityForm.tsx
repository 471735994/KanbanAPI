import {
  AddCircleOutlined,
  CheckCircle,
  Close,
  EditNote,
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
import { useForm, type FieldValues } from "react-hook-form";
import { useEffect } from "react";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ActivitySchema>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: {
        venue: "",
        city: "",
        latitude: 0,
        longitude: 0,
      },
    },
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });

  const navigate = useNavigate();

  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  // 重置表单数据：当 activity 变化时，重置表单
  useEffect(() => {
    if (activity) {
      const { city, venue, latitude, longitude, ...activityFields } = activity;

      reset({
        ...activityFields,
        location: { city, venue, latitude, longitude },
      });
    }
  }, [activity, reset]);

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  const isEditing = activity ? true : false;

  const onSubmit = (data: FieldValues) => {
    const { location, ...rest } = data;
    const activityData = { ...rest, ...location };
    console.log(activityData);
    try {
      if (activity) {
        updateActivity.mutate(
          { ...activity, ...activityData },
          {
            onSuccess: () => navigate(`/activities/${activity.id}`),
          },
        );
      } else {
        createActivity.mutate(
          { ...activityData },
          {
            onSuccess: (id) => navigate(`/activities/${id}`),
          },
        );
      }
    } catch (error) {
      console.log(error);
      navigate("/activities");
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

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2.5}>
            <Grid size={12}>
              <TextField
                {...register("title")}
                fullWidth
                label="Title"
                placeholder="e.g. Mountain Hiking Trip"
                defaultValue={activity?.title}
                error={!!errors.title}
                helperText={errors.title?.message}
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
                {...register("description")}
                label="Description"
                placeholder="Tell us more about this activity..."
                defaultValue={activity?.description}
                error={!!errors.description}
                helperText={errors.description?.message}
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
              <SelectInput
                items={categoryOptions}
                label="Category"
                control={control}
                name="category"
              ></SelectInput>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DateTimeInput name="date" control={control}></DateTimeInput>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <LocationInput
                control={control}
                label="Enter the location"
                name="location"
              ></LocationInput>
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
