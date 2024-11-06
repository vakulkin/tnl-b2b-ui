import { Link, useMatchRoute } from '@tanstack/react-router';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const NavigationItem = ({ item, isCollapsed }) => {
  const matchRoute = useMatchRoute();
  const isActive = item.type === 'internal' && matchRoute({ to: `/${item.segment}` });

  const commonProps = {
    sx: {
      justifyContent: isCollapsed ? 'center' : 'flex-start',
      alignItems: 'center',
      height: 56,
    },
    className: isActive ? 'list-item-active' : 'list-item-hover',
  };

  const listItemIcon = (
    <ListItemIcon
      className="icon-default"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {item.icon}
    </ListItemIcon>
  );

  const listItemText = !isCollapsed && (
    <ListItemText primary={item.title} className="text-default" />
  );

  if (item.type === 'internal') {
    return (
      <ListItemButton component={Link} to={`/${item.segment}`} {...commonProps}>
        {listItemIcon}
        {listItemText}
      </ListItemButton>
    );
  } else {
    return (
      <ListItemButton
        component="a"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {listItemIcon}
        {listItemText}
      </ListItemButton>
    );
  }
};

export default NavigationItem;
