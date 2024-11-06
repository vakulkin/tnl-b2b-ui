import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ToggleCollapseButton = ({ isCollapsed, handleToggleDrawer }) => (
  <ListItemButton
    onClick={handleToggleDrawer}
    sx={{
      mt: 5,
      justifyContent: isCollapsed ? 'center' : 'flex-start',
      alignItems: 'center',
      height: 56,
    }}
  >
    <ListItemIcon
      className="icon-default"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'inherit',
      }}
    >
      {isCollapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </ListItemIcon>
    {!isCollapsed && <ListItemText primary="Collapse" className="text-default" />}
  </ListItemButton>
);

export default ToggleCollapseButton;
