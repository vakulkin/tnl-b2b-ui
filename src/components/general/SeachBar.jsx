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

export default SearchBar;
