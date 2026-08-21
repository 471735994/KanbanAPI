import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useAccount } from "../../lib/hooks/useAccount";

export default function NavBar() {
  const { currentUser } = useAccount();
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
            <Box
              component={NavLink}
              to="/"
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Group fontSize="large" />
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Reactivities
              </Typography>
            </Box>

            <MenuList
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <MenuItemLink to="/activities">Activites</MenuItemLink>
              <MenuItemLink to="/createActivity">Create Activity</MenuItemLink>
              <MenuItemLink to="/errors">Errors</MenuItemLink>
            </MenuList>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {currentUser ? (
                <Typography>Welcome {currentUser.displayName}</Typography>
              ) : (
                <>
                  <Button
                    size="large"
                    variant="contained"
                    color="warning"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button size="large" variant="contained" color="primary">
                    Register
                  </Button>
                </>
              )}

              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {}}
              >
                User Menu
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
