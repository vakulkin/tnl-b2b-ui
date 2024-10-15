import { Box } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PropTypes from "prop-types";
import ActionButton from "./ActionButton";
import { getEntityStore } from "../../store";

const CardActions = ({ entityKey, entity }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <ActionButton
        icon={<EditOutlinedIcon />}
        label="Edytuj"
        ariaLabel="edit"
        onClick={() => handleFormDialogOpen("edit", entity.id)}
      />
      <ActionButton
        icon={<DeleteOutlineOutlinedIcon />}
        label="Usuń"
        ariaLabel="delete"
        onClick={() => handleFormDialogOpen("delete", entity.id)}
      />
    </Box>
  );
};

CardActions.propTypes = {
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default CardActions;
