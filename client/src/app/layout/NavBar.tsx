import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7a0 100%)",
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar
            sx={{
              display: "flex",
              gap: 2,
              px: { xs: 2, sm: 3 },
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Group fontSize="large" />
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Reactivities
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                Activites
              </Box>
              <Box
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                About
              </Box>
              <Box
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                Contact
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button size="large" variant="contained" color="warning">
                Login
              </Button>
              <Button size="large" variant="contained" color="primary">
                Register
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
