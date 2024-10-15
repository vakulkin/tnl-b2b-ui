import PropTypes from "prop-types";
import { getEntityStore } from "../../store";
import { useManagement } from "../../useManagement";
import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ActionButton from "./ActionButton";

const PageHeader = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const { useEntitiesQuery } =
  useManagement(entityKey);

  const { data: infoData, isLoading: infoIsLoading } =
  useEntitiesQuery("info");

if (infoIsLoading) return "Loading...";

  return (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h4">{infoData?.many}</Typography>
      {handleFormDialogOpen && (
        <ActionButton
          icon={<AddCircleOutlineIcon />}
          size="large"
          label={`Dodaj ${infoData?.whom}`}
          ariaLabel="add"
          onClick={() => handleFormDialogOpen("add")}
        />
      )}
    </Box>
  );
};

PageHeader.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default PageHeader;
