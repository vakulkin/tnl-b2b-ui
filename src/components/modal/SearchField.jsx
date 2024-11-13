import {
  Box,
  TextField,
} from "@mui/material";

const SearchField = ({ formik, disabled }) => (
  <Box sx={{ py: 2 }}>
    <TextField
      label="Search"
      size="small"
      variant="standard"
      fullWidth
      name="search"
      value={formik.values.search}
      onChange={formik.handleChange}
      disabled={disabled}
    />
  </Box>
);

export default SearchField;