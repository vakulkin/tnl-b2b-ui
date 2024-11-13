import PropTypes from "prop-types";
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
      page={paginationModel.page + 1}
      onChange={onPageChange}
      showFirstButton
      showLastButton
    />
  </Box>
);

PaginationComponent.propTypes = {
  totalPages: PropTypes.number.isRequired,
  paginationModel: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
