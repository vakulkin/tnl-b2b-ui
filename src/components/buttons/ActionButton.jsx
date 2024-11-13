import PropTypes from "prop-types";
import { Button } from "@mui/material";

const ActionButton = ({ icon, label, ariaLabel, onClick, size = "medium" }) => (
  <Button
    variant="text"
    size={size}
    startIcon={icon}
    aria-label={ariaLabel}
    onClick={onClick}
    sx={{
      color: "#2C3E50",
    }}
  >
    {label}
  </Button>
);

ActionButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default ActionButton;
