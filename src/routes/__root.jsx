import { useState } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import DrawerContent from '../components/general/Header/DrawerContent';

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const RootComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleToggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <Outlet />
      </Box>
      <Drawer
        anchor="right"
        variant={isMobile && !isCollapsed ? 'temporary' : 'permanent'}
        open={!isCollapsed}
        onClose={handleToggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#022049',
            color: '#FFFFFF',
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
