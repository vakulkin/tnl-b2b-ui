import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import DrawerContent from "../components/header/DrawerContent";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EditModal from "../components/modal/EditModal";

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const RootComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleToggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer Component */}
      <Drawer
        anchor="left" // Changed from "right" to "left"
        variant={isMobile && !isCollapsed ? "temporary" : "permanent"}
        open={!isCollapsed}
        onClose={handleToggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#022049",
            color: "#FFFFFF",
          },
        }}
      >
        <DrawerContent
          isCollapsed={isCollapsed}
          handleToggleDrawer={handleToggleDrawer}
        />
      </Drawer>

      {/* Main content, adjusts automatically based on drawer state */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${isCollapsed ? collapsedDrawerWidth : drawerWidth}px)`,
          },
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
      <EditModal entityKey="settings" />
      <ReactQueryDevtools initialIsOpen={false} />
    </Box>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
