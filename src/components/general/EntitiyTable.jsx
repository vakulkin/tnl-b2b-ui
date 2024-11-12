import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { Box, TextField, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getEntityStore } from "../../store";
import { useFetchEntityList } from "../../useManagement";
import PageHeader from "./PageHeader";
import SingleLoader from "./SingleLoader";
import EditModal from "./Modal/EditModal";
import ActionButton from "./ActionButton";
import LimitedChips from "../LimitedChips";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const EntityTable = ({ entityKey, columnsConfig, additionalModals = [] }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  // Pagination and sorting state using paginationModel
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // 0-based index for DataGrid
    pageSize: 10, // Default page size
  });

  const [sortModel, setSortModel] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Optional: Implement search

  // Build query parameters based on paginationModel and sortModel
  const queryParams = useMemo(
    () => ({
      page: paginationModel.page + 1, // Backend expects 1-based indexing
      per_page: paginationModel.pageSize,
      order_by: sortModel[0]?.field || "",
      order_dir: sortModel[0]?.sort || "ASC",
      search: searchTerm,
      // Add conditions if needed
    }),
    [paginationModel, sortModel, searchTerm]
  );

  const {
    data: entityData,
    isLoading,
    isFetching,
    error,
  } = useFetchEntityList(entityKey, "joined", queryParams);

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPaginationModel((prev) => ({ ...prev, page: 0 })); // Reset to first page on search
  };

  // Cell Renderer for LimitedChips
  const renderLimitedChipsCell = (colDef) => {
    function LimitedChipsCell(params) {
      const items = params.value ? JSON.parse(params.value) : [];
      return (
        <LimitedChips
          items={items}
          entityKey={colDef.entityKey || entityKey}
          entity={params.row}
          attachmentKey={params.field}
          maxVisibleItems={colDef.maxVisibleItems || 10}
          prefix={colDef.prefix || ""}
          postfix={colDef.postfix || ""}
        />
      );
    }

    LimitedChipsCell.displayName = `LimitedChipsCell(${colDef.field})`;
    return LimitedChipsCell;
  };

  // Cell Renderer for Action Buttons
  const renderActionButtonCell = (action) => {
    function ActionButtonCell(params) {
      const icons = {
        edit: <EditOutlinedIcon />,
        delete: <DeleteOutlineOutlinedIcon />,
      };

      const labels = {
        edit: "Edit",
        delete: "Delete",
      };

      return (
        <ActionButton
          icon={icons[action]}
          label={labels[action]}
          ariaLabel={action}
          onClick={() => handleFormDialogOpen(action, params.id)}
        />
      );
    }

    ActionButtonCell.displayName = `ActionButtonCell(${action})`;
    return ActionButtonCell;
  };

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () =>
      columnsConfig.map((col) => {
        if (col.renderCell) {
          return col;
        } else if (col.type === "limitedChips") {
          return {
            ...col,
            renderCell: renderLimitedChipsCell(col),
          };
        } else if (col.type === "action") {
          return {
            ...col,
            renderCell: renderActionButtonCell(col.action),
          };
        } else {
          return col;
        }
      }),
    [columnsConfig]
  );

  if (isLoading) return <SingleLoader icon={entityKey} size={32} />;
  if (error) return <div>Error loading data.</div>;

  // Calculate total number of pages
  const totalPages = Math.ceil(entityData.total / paginationModel.pageSize);

  return (
    <Box sx={{ p: 4, background: "#fff" }}>
      <PageHeader entityKey={entityKey} />

      {/* Optional: Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
        fullWidth
      />
      <Box sx={{ width: "100%" }}>
        <DataGrid
          loading={isFetching}
          rows={entityData.items}
          columns={columns}
          getRowHeight={() => "auto"}
          sx={{
            maxWidth: "100%",
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
          }}
          paginationMode="server"
          sortingMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          rowCount={entityData.total}
          pageSizeOptions={[10, 20, 30, 50]}
          onSortModelChange={handleSortModelChange}

          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
        />
      </Box>

      {/* Custom Pagination with Page Numbers */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={paginationModel.page + 1} // Convert 0-based index to 1-based for Pagination component
          onChange={(event, value) => {
            setPaginationModel((prev) => ({ ...prev, page: value - 1 })); // Convert back to 0-based index
          }}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>

      <EditModal entityKey={entityKey} />
    </Box>
  );
};

// Define prop types for the component
EntityTable.propTypes = {
  entityKey: PropTypes.string.isRequired,
  columnsConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
  additionalModals: PropTypes.arrayOf(PropTypes.string),
};

export default EntityTable;
