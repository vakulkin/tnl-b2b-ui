import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <TextField
    label="Search"
    size="small"
    variant="standard"
    value={searchTerm}
    onChange={onSearchChange}
    sx={{ mb: 2 }}
    fullWidth
  />
);

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
