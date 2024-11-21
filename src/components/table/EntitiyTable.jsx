import { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import debounce from "lodash/debounce";

import { getEntityStore } from "../../store";
import { useFetchEntityList } from "../../useManagement";
import PageHeader from "../general/PageHeader";
import SingleLoader from "../general/SingleLoader";
import EditModal from "../modal/EditModal";
import LimitedChips from "../chips/LimitedChips";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconActionButton from "../buttons/IconActionButton";
import EntityDataGrid from "./EntityDataGrid";
import PaginationComponent from "../general/PaginationComponent";
import SearchField from "../general/SearchField";
import ColumnHeader from "./ColumnHeader";

const EntityTable = ({ entityKey, columnsConfig }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Formik for handling search term
  const formik = useFormik({
    initialValues: { search: "" },
    onSubmit: () => {},
  });

  // Debounce search term update
  useEffect(() => {
    const handler = debounce((value) => {
      setDebouncedSearchTerm(value);
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }, 500);

    handler(formik.values.search);

    return () => {
      handler.cancel();
    };
  }, [formik.values.search]);

  // Query params to fetch the data list
  const queryParams = useMemo(
    () => ({
      page: paginationModel.page + 1,
      per_page: paginationModel.pageSize,
      order_by: sortModel[0]?.field || "",
      order_dir: sortModel[0]?.sort || "ASC",
      search: debouncedSearchTerm,
    }),
    [paginationModel, sortModel, debouncedSearchTerm]
  );

  // Fetch entity list with the current query params
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

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => getColumns(columnsConfig, entityKey, handleFormDialogOpen),
    [columnsConfig, handleFormDialogOpen, entityKey]
  );

  if (isLoading) return <SingleLoader icon={entityKey} size={32} />;
  if (error) return <div>Error loading data.</div>;

  // Calculate total number of pages
  const totalPages = Math.ceil(entityData.total / paginationModel.pageSize);

  return (
    <Box sx={{ p: 4, background: "#fff" }}>
      <PageHeader entityKey={entityKey} />
      <form onSubmit={formik.handleSubmit}>
        <SearchField
          searchTerm={formik.values.search}
          onSearchChange={formik.handleChange}
        />
      </form>
      <EntityDataGrid
        entityData={entityData}
        columns={columns}
        isFetching={isFetching}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        onSortModelChange={handleSortModelChange}
      />

      {totalPages > 1 && (
        <PaginationComponent
          disabled={isFetching}
          totalPages={totalPages}
          paginationModel={{ ...paginationModel, page: paginationModel.page + 1 }}
          onPageChange={(event, value) => {
            setPaginationModel((prev) => ({ ...prev, page: value - 1 }));
          }}
        />
      )}

      {/* Edit Modals */}
      <EditModal entityKey="rules" />
      <EditModal entityKey="logic_blocks" />
      <EditModal entityKey="roles" />
      <EditModal entityKey="groups" />
      <EditModal entityKey="terms" />
      <EditModal entityKey="products" />
      <EditModal entityKey="users" />
    </Box>
  );
};

// Utility function to define columns
const getColumns = (columnsConfig, entityKey, handleFormDialogOpen) =>
  columnsConfig.map((col) => {
    const newCol = {
      ...col,
      renderHeader: (params) => (
        <ColumnHeader params={params} />
      ),
    };

    switch (newCol.type) {
      case "limitedChips":
        return {
          ...newCol,
          renderCell: (params) => (
            <LimitedChips
              items={params.value ? JSON.parse(params.value) : []}
              entityKey={col.entityKey || entityKey}
              entity={params.row}
              attachmentKey={params.field}
              maxVisibleItems={col.maxVisibleItems || 10}
              prefix={col.prefix || ""}
              postfix={col.postfix || ""}
            />
          ),
        };
      case "action":
        return {
          ...newCol,
          renderCell: (params) => (
            <IconActionButton
              icon={
                col.action === "edit" ? (
                  <EditOutlinedIcon fontSize="inherit" />
                ) : (
                  <DeleteOutlineOutlinedIcon fontSize="inherit" />
                )
              }
              ariaLabel={col.action}
              onClick={() => handleFormDialogOpen(col.action, params.id)}
            />
          ),
        };
      default:
        return newCol;
    }
  });

export default EntityTable;
