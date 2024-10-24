import { useState } from "react";
import {
  createRootRoute,
  Outlet,
  Link,
  useMatchRoute,
} from "@tanstack/react-router";
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

const DrawerContent = ({ isCollapsed, handleToggleDrawer }) => {
  const matchRoute = useMatchRoute();

  return (
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
  {navigation.map((item) => {
    const isActive = item.type === "internal" && matchRoute({ to: `/${item.segment}` });

    return item.type === "internal" ? (
      <ListItemButton
        key={item.segment}
        component={Link}
        to={`/${item.segment}`}
        sx={{
          justifyContent: isCollapsed ? "center" : "flex-start",
          alignItems: "center",
          height: 56,
        }}
        className={isActive ? "list-item-active" : "list-item-hover"}
      >
        <ListItemIcon
          className="icon-default"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.icon}
        </ListItemIcon>
        {!isCollapsed && (
          <ListItemText 
            primary={item.title} 
            className="text-default"
          />
        )}
      </ListItemButton>
    ) : (
      <ListItemButton
        key={item.url}
        component="a"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          justifyContent: isCollapsed ? "center" : "flex-start",
          alignItems: "center",
          height: 56,
        }}
        className="list-item-hover"
      >
        <ListItemIcon
          className="icon-default"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.icon}
        </ListItemIcon>
        {!isCollapsed && (
          <ListItemText 
            primary={item.title} 
            className="text-default"
          />
        )}
      </ListItemButton>
    );
  })}
  <ListItemButton
    onClick={handleToggleDrawer}
    sx={{
      mt: 5,
      justifyContent: isCollapsed ? "center" : "flex-start",
      alignItems: "center",
      height: 56,
    }}
  >
    <ListItemIcon
      className="icon-default"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "inherit",
      }}
    >
      {isCollapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </ListItemIcon>
    {!isCollapsed && (
      <ListItemText 
        primary="Collapse" 
        className="text-default"
      />
    )}
  </ListItemButton>
</List>


    </Box>
  );
};

const RootComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Set the initial state based on whether it's mobile or desktop
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleToggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
        <Outlet />
      </Box>
      <Drawer
        anchor="right"
        variant={isMobile && !isCollapsed ? "temporary" : "permanent"}
        open={!isCollapsed}
        onClose={handleToggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
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
    </Box>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
