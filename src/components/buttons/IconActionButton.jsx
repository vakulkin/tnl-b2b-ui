import { IconButton } from "@mui/material";

const IconActionButton = ({ icon, ariaLabel, onClick, size = "medium" }) => (
  <IconButton size={size} aria-label={ariaLabel} onClick={onClick}>
    {icon}
  </IconButton>
);

export default IconActionButton;
