import { TextField } from "@mui/material";
import { useFetchInfoByKey } from "../../useManagement";

const SearchField = ({ entityKey, searchTerm, onSearchChange }) => {
  const entityInfoData = useFetchInfoByKey(entityKey);

  return (
    <TextField
      label={`Szukaj ${entityInfoData.isLoading ? "" : entityInfoData?.data.many.toLowerCase()}`}
      size="small"
      variant="standard"
      fullWidth
      name="search"
      value={searchTerm}
      onChange={onSearchChange}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchField;
