import PropTypes from "prop-types";
import { Box, Chip } from "@mui/material";

const LogicSeparator = ({ separator }) => (
  <Box sx={{ textAlign: "center" }}>
    <Chip sx={{ color: "#fff" }} label={separator} />
  </Box>
);

LogicSeparator.propTypes = {
  separator: PropTypes.string,
};

export default LogicSeparator;
