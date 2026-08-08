import { useState, type ChangeEvent, type FormEvent } from "react";
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
import {
  AddCircleOutlined,
  CalendarMonth,
  Category as CategoryIcon,
  CheckCircle,
  Close,
  EditNote,
  LocationOn,
  Notes,
  Place,
  Title as TitleIcon,
} from "@mui/icons-material";

type Props = {
  activity?: Activity | null;
  onSubmit: (activity: Activity) => void;
  closeForm:()=>void;
};

const emptyActivity: Activity = {
  id: "",
  title: "",
  date: "",
  description: "",
  category: "",
  isCancelled: false,
  city: "",
  venue: "",
  latitude: 0,
  longitude: 0,
};

const requiredFields = [
  "title",
  "description",
  "category",
  "date",
  "city",
  "venue",
] as const;

type FormErrors = Partial<
  Record<(typeof requiredFields)[number], string>
>;

export default function ActivityForm({ activity, onSubmit, closeForm }: Props) {
  const [form, setForm] = useState<Activity>(() =>
    activity ? { ...activity } : { ...emptyActivity },
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [prevActivity, setPrevActivity] = useState(activity);

  // 当传入的 activity 变化时（例如切换到编辑另一条记录）重置表单状态。
  // 在渲染期间调整 state 是 React 官方推荐的做法，可避免额外的级联渲染。
  if (activity !== prevActivity) {
    setPrevActivity(activity);
    setForm(activity ? { ...activity } : { ...emptyActivity });
    setErrors({});
  }

  const isEditing = Boolean(activity?.id);

  const handleChange =
    (field: keyof Activity) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if ((requiredFields as readonly string[]).includes(field)) {
        setErrors((prev) => {
          const key = field as (typeof requiredFields)[number];
          if (!prev[key]) return prev;
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: FormErrors = {};
    for (const field of requiredFields) {
      if (!form[field].trim()) {
        newErrors[field] = "This field is required";
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSubmit(form);
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

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2.5}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Title"
                placeholder="e.g. Mountain Hiking Trip"
                value={form.title}
                onChange={handleChange("title")}
                error={Boolean(errors.title)}
                helperText={errors.title ?? " "}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Description"
                placeholder="Tell us more about this activity..."
                multiline
                rows={4}
                value={form.description}
                onChange={handleChange("description")}
                error={Boolean(errors.description)}
                helperText={errors.description ?? " "}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ mt: -2.5, alignSelf: "flex-start" }}
                      >
                        <Notes color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Category"
                placeholder="e.g. Music, Sports"
                value={form.category}
                onChange={handleChange("category")}
                error={Boolean(errors.category)}
                helperText={errors.category ?? " "}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Date"
                type="datetime-local"
                value={form.date}
                onChange={handleChange("date")}
                error={Boolean(errors.date)}
                helperText={errors.date ?? " "}
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
                label="City"
                placeholder="e.g. Beijing"
                value={form.city}
                onChange={handleChange("city")}
                error={Boolean(errors.city)}
                helperText={errors.city ?? " "}
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
                label="Venue"
                placeholder="e.g. Olympic Park"
                value={form.venue}
                onChange={handleChange("venue")}
                error={Boolean(errors.venue)}
                helperText={errors.venue ?? " "}
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
