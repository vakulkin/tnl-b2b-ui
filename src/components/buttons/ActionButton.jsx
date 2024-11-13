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

export default ActionButton;
