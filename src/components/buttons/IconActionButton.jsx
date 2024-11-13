import PropTypes from "prop-types";
import { IconButton } from "@mui/material";

const IconActionButton = ({ icon, ariaLabel, onClick, size = "medium" }) => (
  <IconButton size={size} aria-label={ariaLabel} onClick={onClick}>
    {icon}
  </IconButton>
);

IconActionButton.propTypes = {
  icon: PropTypes.element.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default IconActionButton;
