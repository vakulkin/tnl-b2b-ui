import Tooltip from "@mui/material/Tooltip";
import { useFetchInfoByKey } from "../../useManagement";
import { Box, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const InfoTooltip = ({ field, children }) => {
  const { data: infoData, isLoading: infoIsLoading } = useFetchInfoByKey(field);

  if (infoIsLoading) {
    return <>Loading...</>;
  }

  if (infoData && infoData.description) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box>{children}</Box>
        <Tooltip
          sx={{ whiteSpace: "pre-line" }}
          title={
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: infoData.description }}
            />
          }
          arrow
        >
          <HelpOutlineIcon sx={{ ml: 1, cursor: "help" }} fontSize="small" />
        </Tooltip>
      </Box>
    );
  }

  return <Box>{children}</Box>;
};

export default InfoTooltip;
