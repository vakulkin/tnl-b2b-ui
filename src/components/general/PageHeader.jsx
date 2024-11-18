import { getEntityStore } from "../../store";
import { useFetchInfoByKey } from "../../useManagement";
import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ActionButton from "../buttons/ActionButton";
import EntityIcon from "./EntityIcon";
import InfoTooltip from "./InfoTooltip";

const PageHeader = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const { data: infoData, isLoading: infoIsLoading } =
    useFetchInfoByKey(entityKey);

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
          <InfoTooltip field={entityKey}>
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
              variant="h1"
            >
              <EntityIcon icon={entityKey} size={34} />
              {infoData?.many}
            </Typography>
          </InfoTooltip>
          {infoData?.type === "plugin" && (
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

export default PageHeader;
