import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import Event from "@mui/icons-material/Event";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FilterList } from "@mui/icons-material";

export default function ActivityFilters() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "3",
        borderRadius: 3,
      }}
    >
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              fontWeight: "bold",
              color:'primary.main'
            }}
          >
            <FilterList sx={{ mr: 1 }} />
            Filters
          </Typography>
          <MenuList>
            <MenuItem>
              <ListItemText primary="All events"></ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm going"></ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm hosting"></ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm hosting"></ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Paper>
      <Box
        component={Paper}
        sx={{
          width: "100%",
          p: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            color:'primary.main'
          }}
        >
          <Event sx={{ mr: 1 }} />
          Select date
        </Typography>
        <Calendar />
      </Box>
    </Box>
  );
}
