import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import {  LocationOn, Group } from "@mui/icons-material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";

type Props = {
  activity: Activity;
};

const CATEGORY_COLORS: Record<string, string> = {
  drinks: "#f97316",
  music: "#8b5cf6",
  travel: "#0ea5e9",
  culture: "#ec4899",
  food: "#10b981",
  film: "#6366f1",
};

export default function ActivityCard({ activity }: Props) {
  // 设置分类颜色
  const categoryColor =
    CATEGORY_COLORS[activity.category.toLowerCase()] ?? "#182a73";

  const { deleteActivity } = useActivities(); // 删除活动

  const isHost = false; // 是否为主办方
  const isGoing = false; // 是否参加
  const lable = isHost ? "You are hosting" : "You are going"; // 标签
  const isCancelled = false; // 是否取消
  const color = isHost ? "secondary" : isGoing ? "warning" : "default"; // 标签颜色

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "grey.200",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(24, 42, 115, 0.12)",
          borderColor: "primary.main",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2.5,
          pt: 2.5,
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            color: "#fff",
            fontWeight: "bold",
            backgroundImage: `linear-gradient(135deg, ${categoryColor} 0%, #20a7a0 100%)`,
          }}
        >
          {activity.title.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {activity.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "semiBold",
              fontSize: 14,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Hosted by <Link to={`/profiles/bob`}>Bob</Link>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginRight: 2,
            }}
          >
            {(isHost || isGoing) && (
              <Chip label={lable} color={color} size="small" />
            )}
            {isCancelled && (
              <Chip label="Cancelled" color="error" size="small" />
            )}
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}
          >
            <Typography variant="body2" color="text.secondary">
             {formatDate(activity.date)}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={activity.category}
          size="small"
          sx={{
            fontWeight: 600,
            color: "#fff",
            bgcolor: categoryColor,
          }}
        />
      </Box>

      {/* Body */}
      <CardContent sx={{ px: 2.5, pt: 1.5, pb: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.6,
          }}
        >
          {activity.description}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1.5 }}>
          <LocationOn fontSize="small" sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {activity.city} / {activity.venue}
          </Typography>
        </Box>
      </CardContent>

      <Divider sx={{ my: 1.5 }} />

      {/* Footer */}
      <CardActions
        sx={{
          px: 2.5,
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Group fontSize="small" sx={{ color: "text.secondary" }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            活动详情
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            size="small"
            variant="contained"
            disableElevation
            disabled={deleteActivity.isPending}
            onClick={() => deleteActivity.mutate(activity.id)}
            sx={{
              borderRadius: 2,
              px: 2.5,
              textTransform: "none",
              fontWeight: 600,
              backgroundImage:
                "linear-gradient(135deg, #ed944b 0%, #ea540e 69%, #f20a06 100%)",
            }}
          >
            Delete
          </Button>
          <Button
            component={Link}
            to={`/activities/${activity.id}`}
            size="small"
            variant="contained"
            disableElevation
            sx={{
              borderRadius: 2,
              px: 2.5,
              textTransform: "none",
              fontWeight: 600,
              backgroundImage:
                "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7a0 100%)",
            }}
          >
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
