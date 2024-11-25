import { Box, Typography } from "@mui/material";

const DrawerHeader = ({ isCollapsed }) => (
  <Box sx={drawerHeaderStyles.boxStyle}>
    <Typography variant="h6" noWrap sx={drawerHeaderStyles.typographyStyle}>
      {isCollapsed ? "B2B" : "JustB2B.space"}
    </Typography>
  </Box>
);

const drawerHeaderStyles = {
  boxStyle: {
    pt: 2,
    pb: 5,
  },
  typographyStyle: {
    textAlign: "center",
  },
};

export default DrawerHeader;
