import { Box, Pagination } from "@mui/material";

const PaginationComponent = ({
  totalPages,
  paginationModel,
  disabled,
  onPageChange,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mt: 2,
    }}
  >
    <Pagination
      disabled={disabled}
      count={totalPages}
      page={paginationModel.page}
      onChange={onPageChange}
      showFirstButton
      showLastButton
    />
  </Box>
);


export default PaginationComponent;
