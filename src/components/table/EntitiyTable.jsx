import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { getEntityStore } from "../../store";
import { useFetchEntityList } from "../../useManagement";
import PageHeader from "../general/PageHeader";
import SingleLoader from "../general/SingleLoader";
import EditModal from "../modal/EditModal";
import LimitedChips from "../chips/LimitedChips";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconActionButton from "../buttons/IconActionButton";
import SearchBar from "../general/SeachBar";
import EntityDataGrid from "./EntityDataGrid";
import PaginationComponent from "../general/PaginationComponent";
import InfoTooltip from "./InfoTooltip";

const EntityTable = ({ entityKey, columnsConfig }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const queryParams = useMemo(
    () => ({
      page: paginationModel.page + 1,
      per_page: paginationModel.pageSize,
      order_by: sortModel[0]?.field || "",
      order_dir: sortModel[0]?.sort || "ASC",
      search: searchTerm,
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
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
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
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <EntityDataGrid
        entityData={entityData}
        columns={columns}
        isFetching={isFetching}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        onSortModelChange={handleSortModelChange}
      />

      {totalPages > 1 && <PaginationComponent
        disabled={isFetching}
        totalPages={totalPages}
        paginationModel={{ ...paginationModel, page: paginationModel.page + 1 }}
        onPageChange={(event, value) => {
          setPaginationModel((prev) => ({ ...prev, page: value - 1 }));
        }}
      />}

      <EditModal entityKey="rules" />
      <EditModal entityKey="logic_blocks" />
      <EditModal entityKey="roles" />
      <EditModal entityKey="groups" />
      <EditModal entityKey="terms" />
    </Box>
  );
};

const getColumns = (columnsConfig, entityKey, handleFormDialogOpen) =>
  
  columnsConfig.map((col) => {

    const newCol = {
      ...col,
      renderHeader: (params) => (
        <InfoTooltip field={params.field}>
            {params.field}
        </InfoTooltip>
      ),
    }
    
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
