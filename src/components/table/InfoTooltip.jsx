import Tooltip from "@mui/material/Tooltip";
import { useFetchInfoByKey } from "../../useManagement";
import { Box } from "@mui/material";
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
        <Tooltip sx={{ ml: 1 }} title={infoData.description} arrow>
          <HelpOutlineIcon fontSize="small" cursor="help" />
        </Tooltip>
      </Box>
    );
  }

  return <Box>{children}</Box>;
};

export default InfoTooltip;
