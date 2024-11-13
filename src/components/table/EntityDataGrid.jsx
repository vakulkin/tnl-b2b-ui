import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";


const EntityDataGrid = ({ entityData, columns, isFetching, paginationModel, onPaginationModelChange, onSortModelChange }) => (
  <DataGrid
    loading={isFetching}
    rows={entityData.items}
    columns={columns}
    getRowHeight={() => "auto"}
    sx={{
      "& .MuiDataGrid-cell": {
        display: "flex",
        alignItems: "center",
      },
    }}
    paginationMode="server"
    sortingMode="server"
    paginationModel={paginationModel}
    onPaginationModelChange={onPaginationModelChange}
    rowCount={entityData.total}
    pageSizeOptions={[10, 20, 30, 50]}
    onSortModelChange={onSortModelChange}
    disableColumnFilter
    disableColumnSelector
    disableDensitySelector
  />
);

EntityDataGrid.propTypes = {
  entityData: PropTypes.shape({
    items: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  paginationModel: PropTypes.object.isRequired,
  onPaginationModelChange: PropTypes.func.isRequired,
  onSortModelChange: PropTypes.func.isRequired,
};

export default EntityDataGrid;
