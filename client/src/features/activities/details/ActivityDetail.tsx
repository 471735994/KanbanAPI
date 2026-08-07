import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import {
  CalendarMonth,
  LocationOn,
  Edit,
  Close,
} from "@mui/icons-material";

type Props = { activity: Activity };

export default function ActivityDetail({ activity }: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "grey.200",
        bgcolor: "#fff",
      }}
    >
      {/* Banner */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height={200}
          src={`/images/categoryImages/${activity.category}.jpg`}
          sx={{ objectFit: "cover" }}
        />
        {/* 渐变蒙层保证文字可读性 */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.1) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 3,
          }}
        >
          <Chip
            label={activity.category}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              fontWeight: 600,
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(4px)",
            }}
          />
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#fff", lineHeight: 1.2 }}
          >
            {activity.title}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarMonth fontSize="small" sx={{ color: "rgba(255,255,255,0.9)" }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                {new Date(activity.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOn fontSize="small" sx={{ color: "rgba(255,255,255,0.9)" }} />
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                {activity.city} / {activity.venue}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Body */}
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          活动介绍
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          {activity.description}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "grey.50",
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <CalendarMonth fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                日期
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {new Date(activity.date).toLocaleString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "grey.50",
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <LocationOn fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                地点
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {activity.venue}, {activity.city}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Footer */}
      <CardActions
        sx={{
          px: 3,
          pb: 3,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Close />}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          startIcon={<Edit />}
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
            backgroundImage:
              "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7a0 100%)",
          }}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
