import { Dialog } from "@mui/material";
import { getEntityStore } from "../../store";
import EntityForm from "./EntityForm";
import DeleteEntityForm from "./DeleteEntityForm";
import EntityAttachDepsLoader from "./EntityAttachDepsLoader";

const EditModal = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { formMode, isFormDialogOpen, handleFormDialogClose } = useStore();

  const renderContent = () => {
    switch (formMode) {
      case "add":
      case "edit":
        return <EntityForm entityKey={entityKey} />;
      case "delete":
        return <DeleteEntityForm entityKey={entityKey} />;
      case "link":
        return <EntityAttachDepsLoader entityKey={entityKey} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isFormDialogOpen}
      onClose={handleFormDialogClose}
      maxWidth="xl"
      fullWidth
    >
      {renderContent()}
    </Dialog>
  );
};

export default EditModal;
