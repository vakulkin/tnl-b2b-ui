import { TextField } from "@mui/material";

const SearchField = ({ searchTerm, onSearchChange }) => (
    <TextField
      label="Search"
      size="small"
      variant="standard"
      fullWidth
      name="search"
      value={searchTerm}
      onChange={onSearchChange}
      sx={{ mb: 2 }}
    />
);

export default SearchField;
