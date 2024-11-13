import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const DrawerHeader = ({ isCollapsed }) => (
  <Box sx={drawerHeaderStyles.boxStyle}>
    <Typography variant="h6" noWrap sx={drawerHeaderStyles.typographyStyle}>
      {isCollapsed ? 'B2B' : 'TNL B2B Platform'}
    </Typography>
  </Box>
);

const drawerHeaderStyles = {
  boxStyle: {
    pt: 2,
    pb: 5,
  },
  typographyStyle: {
    textAlign: 'center',
  },
};

DrawerHeader.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
};

export default DrawerHeader;
