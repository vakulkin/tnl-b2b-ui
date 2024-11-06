import { Box, Typography } from '@mui/material';

const DrawerHeader = ({ isCollapsed }) => (
  <Box sx={{ pt: 2, pb: 5 }}>
    <Typography variant="h6" noWrap sx={{ textAlign: 'center' }}>
      {isCollapsed ? 'B2B' : 'TNL B2B Platform'}
    </Typography>
  </Box>
);

export default DrawerHeader;
