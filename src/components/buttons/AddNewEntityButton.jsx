import PropTypes from "prop-types";
import {
  Box,
} from "@mui/material";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ActionButton from "../buttons/ActionButton";


const AddNewEntityButton = ({ attachmentInfoData, handleFormDialogOpen }) => (
  <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
    <ActionButton
      icon={<AddLinkIcon />}
      label={`Add ${attachmentInfoData?.whom.toLowerCase()}`}
      ariaLabel="add"
      onClick={() => handleFormDialogOpen("add")}
    />
  </Box>
);

AddNewEntityButton.propTypes = {
  attachmentInfoData: PropTypes.shape({
    whom: PropTypes.string.isRequired,
  }).isRequired,
  handleFormDialogOpen: PropTypes.func.isRequired,
};

export default AddNewEntityButton;