import PropTypes from "prop-types";
import {
  DialogActions,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { getEntityStore } from "../../../store";
import { useDeleteEntityMutation } from "../../../useManagement";

const DeleteEntityForm = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { selectedEntityId, handleFormDialogClose } = useStore();

  const deleteMutation = useDeleteEntityMutation(entityKey, [
    [entityKey, "joined"],
  ]);

  // Handle the delete action
  const handleDelete = () => {
    deleteMutation.mutate(selectedEntityId);
    handleFormDialogClose(); // Close the modal after deletion
  };

  return (
    <>
      <DialogTitle>Usuń</DialogTitle>
      <DialogContent>
        <Typography>
          Czy na pewno chcesz usunąć ten podmiot? Tej akcji nie można cofnąć.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormDialogClose}>Zamknij</Button>
        <Button variant="contained" onClick={handleDelete}>
          Usuń
        </Button>
      </DialogActions>
    </>
  );
};

DeleteEntityForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default DeleteEntityForm;
