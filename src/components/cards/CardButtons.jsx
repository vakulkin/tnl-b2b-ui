import { Box } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PropTypes from "prop-types";
import ActionButton from "../general/ActionButton";
import { getEntityStore } from "../../store";
import { useManagement } from "../../useManagement";

const CardButtons = ({ entityKey, entity }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const { useEntitiesQuery } = useManagement(entityKey);
  const { data: infoData, isLoading: infoIsLoading } = useEntitiesQuery("info");

  if (infoIsLoading) return null;

  const firstWord = infoData.whom.split(" ")[0].toLowerCase();

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <ActionButton
        icon={<EditOutlinedIcon />}
        label={`Edytuj ${firstWord}`}
        ariaLabel="edit"
        onClick={() => handleFormDialogOpen("edit", entity.id)}
      />
      <ActionButton
        icon={<DeleteOutlineOutlinedIcon />}
        label={`Usuń ${firstWord}`}
        ariaLabel="delete"
        onClick={() => handleFormDialogOpen("delete", entity.id)}
      />
    </Box>
  );
};

CardButtons.propTypes = {
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default CardButtons;
