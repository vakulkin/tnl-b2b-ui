import PropTypes from "prop-types";
import { getEntityStore } from "../../store";
import { useFetchInfoByKey } from "../../useManagement";
import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ActionButton from "./ActionButton";
import EntityIcon from "./EntityIcon";

const PageHeader = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const { data: infoData, isLoading: infoIsLoading } = useFetchInfoByKey(entityKey);

  return (
    <Box
      className="logicBlocksTable"
      sx={{
        mb: 6,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {infoIsLoading ? (
        <EntityIcon icon={entityKey} size={34} />
      ) : (
        <>
          <Typography
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            variant="h1"
          >
            <EntityIcon icon={entityKey} size={34} />
            {infoData?.many}
          </Typography>
          {infoIsLoading
            ? null
            : handleFormDialogOpen && (
                <ActionButton
                  icon={<AddCircleOutlineIcon />}
                  size="large"
                  label={`Dodaj ${infoData?.whom?.toLowerCase()}`}
                  ariaLabel="add"
                  onClick={() => handleFormDialogOpen("add")}
                />
              )}
        </>
      )}
    </Box>
  );
};

PageHeader.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default PageHeader;
