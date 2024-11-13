import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';

const ToggleCollapseButton = ({ isCollapsed, handleToggleDrawer }) => (
  <ListItemButton onClick={handleToggleDrawer} sx={toggleButtonStyles.listItemButtonStyle(isCollapsed)}>
    <ListItemIcon className="icon-default" sx={toggleButtonStyles.listItemIconStyle}>
      {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </ListItemIcon>
    {!isCollapsed && <ListItemText primary="Collapse" className="text-default" />}
  </ListItemButton>
);

const toggleButtonStyles = {
  listItemButtonStyle: (isCollapsed) => ({
    mt: 5,
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    alignItems: 'center',
    height: 56,
  }),
  listItemIconStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'inherit',
  },
};

ToggleCollapseButton.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
};

export default ToggleCollapseButton;
