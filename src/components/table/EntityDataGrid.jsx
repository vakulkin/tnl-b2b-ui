import { DataGrid } from "@mui/x-data-grid";

const EntityDataGrid = ({
  entityData,
  columns,
  isFetching,
  paginationModel,
  onPaginationModelChange,
  onSortModelChange,
}) => (
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

export default EntityDataGrid;
