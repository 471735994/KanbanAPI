import {
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
} from "@mui/material";

export default function ActivityDetailsSidebar() {
  const following = true;
  const isHost = true;

  return (
    <>
      <Paper
        sx={{
          textAlign: "center",
          border: "none",
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
          mb: 2,
        }}
      >
        <Typography variant="h6">2 people going</Typography>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <List sx={{ display: "flex", flexDirection: "column", p: 0 }}>
            <ListItem sx={{ p: 0 }}>
              <ListItemAvatar>
                <Avatar alt={"attendee name"} src={"/assets/user.png"} />
              </ListItemAvatar>
              <ListItemText>
                <Typography variant="h6">Bob</Typography>
              </ListItemText>
            </ListItem>
          </List>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1,
            }}
          >
            {isHost && (
              <Chip
                label="Host"
                color="warning"
                variant="filled"
                sx={{ borderRadius: 2 }}
              />
            )}
            {following && (
              <Typography variant="body2" color="orange">
                Following
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
}
