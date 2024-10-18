import { useState } from "react";
import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import navigation from "../components/general/Navigation";

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const DrawerContent = ({ isCollapsed, handleToggleDrawer }) => (
  <Box>
    <Box sx={{ pt: 2, pb: 5 }}>
      <Typography
        variant="h6"
        noWrap
        sx={{
          textAlign: "center",
        }}
      >
        {isCollapsed ? "B2B" : "TNL B2B Platform"}
      </Typography>
    </Box>
    <List>
      {navigation.map((item) => (
        <ListItemButton
          key={item.segment}
          component={Link}
          to={`/${item.segment}`}
          sx={{
            justifyContent: isCollapsed ? "center" : "flex-start",
            height: 56,
          }}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            {item.icon}
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary={item.title} />}
        </ListItemButton>
      ))}
      <ListItemButton
        onClick={handleToggleDrawer}
        sx={{
          mt: 5,
          justifyContent: isCollapsed ? "center" : "flex-start",
          height: 56,
        }}
      >
        <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </ListItemIcon>
        {!isCollapsed && <ListItemText primary="Collapse" />}
      </ListItemButton>
    </List>
  </Box>
);

const RootComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant={isMobile && !isCollapsed ? "temporary" : "permanent"}
        open={!isCollapsed}
        onClose={handleToggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerContent
          isCollapsed={isCollapsed}
          handleToggleDrawer={handleToggleDrawer}
        />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
