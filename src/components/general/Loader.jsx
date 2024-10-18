import PropTypes from "prop-types";
import { Box } from "@mui/material";
import EntityIcon from "./EntityIcon";

const Loader = ({ size }) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {["rules", "logic_blocks", "products", "users"].map((icon) => (
        <EntityIcon key={icon} icon={icon} size={size} />
      ))}
    </Box>
  );
};

Loader.propTypes = {
  size: PropTypes.number.isRequired,
};

export default Loader;
