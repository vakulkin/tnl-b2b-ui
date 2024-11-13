import { Link, useMatchRoute } from '@tanstack/react-router';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

const NavigationItem = ({ item, isCollapsed }) => {
  const matchRoute = useMatchRoute();
  const isActive = item.type === 'internal' && matchRoute({ to: `/${item.segment}` });

  const commonProps = getCommonProps(isCollapsed, isActive);
  const listItemIcon = getListItemIcon(item.icon);
  const listItemText = getListItemText(item.title, isCollapsed);

  return item.type === 'internal' ? (
    <InternalNavigationLink item={item} commonProps={commonProps} listItemIcon={listItemIcon} listItemText={listItemText} />
  ) : (
    <ExternalNavigationLink item={item} commonProps={commonProps} listItemIcon={listItemIcon} listItemText={listItemText} />
  );
};

const getCommonProps = (isCollapsed, isActive) => ({
  sx: {
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    alignItems: 'center',
    height: 56,
  },
  className: isActive ? 'list-item-active' : 'list-item-hover',
});

const getListItemIcon = (icon) => (
  <ListItemIcon
    className="icon-default"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {icon}
  </ListItemIcon>
);

const getListItemText = (title, isCollapsed) => (
  !isCollapsed && <ListItemText primary={title} className="text-default" />
);

const InternalNavigationLink = ({ item, commonProps, listItemIcon, listItemText }) => (
  <ListItemButton component={Link} to={`/${item.segment}`} {...commonProps}>
    {listItemIcon}
    {listItemText}
  </ListItemButton>
);

const ExternalNavigationLink = ({ item, commonProps, listItemIcon, listItemText }) => (
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

NavigationItem.propTypes = {
  item: PropTypes.shape({
    segment: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['internal', 'external']).isRequired,
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired,
};

InternalNavigationLink.propTypes = {
  item: PropTypes.object.isRequired,
  commonProps: PropTypes.object.isRequired,
  listItemIcon: PropTypes.node.isRequired,
  listItemText: PropTypes.node,
};

ExternalNavigationLink.propTypes = {
  item: PropTypes.object.isRequired,
  commonProps: PropTypes.object.isRequired,
  listItemIcon: PropTypes.node.isRequired,
  listItemText: PropTypes.node,
};

export default NavigationItem;