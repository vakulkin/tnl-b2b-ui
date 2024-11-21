import Tooltip from "@mui/material/Tooltip";
import { Box, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const InfoTooltip = ({ text, children }) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box>{children}</Box>
        <Tooltip
          sx={{ whiteSpace: "pre-line" }}
          title={
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          }
          arrow
        >
          <HelpOutlineIcon sx={{ ml: 1, cursor: "help" }} fontSize="small" />
        </Tooltip>
      </Box>
    );
  };

export default InfoTooltip;
