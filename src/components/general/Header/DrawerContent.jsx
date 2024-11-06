import { Box, List } from '@mui/material';
import navigation from '../Navigation';
import DrawerHeader from './DrawerHeader';
import NavigationItem from './NavigationItem';
import ToggleCollapseButton from './ToggleCollapseButton';

const DrawerContent = ({ isCollapsed, handleToggleDrawer }) => {
  return (
    <Box>
      <DrawerHeader isCollapsed={isCollapsed} />
      <List>
        {navigation.map((item) => (
          <NavigationItem
            key={item.type === 'internal' ? item.segment : item.url}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
        <ToggleCollapseButton
          isCollapsed={isCollapsed}
          handleToggleDrawer={handleToggleDrawer}
        />
      </List>
    </Box>
  );
};

export default DrawerContent;
