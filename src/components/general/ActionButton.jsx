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
      minWidth: "auto",
      padding: "6px",
      color: "#2C3E50",
      textTransform: "initial",
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
