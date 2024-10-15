import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Chip,
  Tooltip,
  Pagination,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddLinkIcon from "@mui/icons-material/AddLink";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { getEntityStore } from "../../../store";
import { useManagement } from "../../../useManagement";
import ActionButton from "../ActionButton";

const EntityAttachForm = ({ entityKey, depsData }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const useStore = getEntityStore(entityKey);
  const { selectedEntityId, attachmentKey, handleFormDialogClose } = useStore();

  const { useEntityQuery } = useManagement(entityKey);

  const {
    data: entityData,
    isFetching: entityIsFetching,
    isLoading: entityIsLoading,
    error: entityError,
  } = useEntityQuery(selectedEntityId, "joined");

  const { useEntitiesQuery: useEntitiesQueryAttachments } =
    useManagement(attachmentKey);

  const {
    data: attachmentsData,
    isLoading: attachmentsIsLoading,
    error: attachmentsError,
  } = useEntitiesQueryAttachments("simple", {
    page,
    search: searchTerm, // Pass the search term to the query
  });

  const { createMutation, deleteMutation } = useManagement(
    depsData[attachmentKey].relation.route
  );

  const {
    data: attachmentInfoData,
    isLoading: attachmentInfoIsLoading,
    error: attachmentInfoError,
  } = useEntitiesQueryAttachments("info");

  const useStoreAttachment = getEntityStore(attachmentKey);
  const { handleFormDialogOpen } = useStoreAttachment();

  if (entityIsLoading || attachmentsIsLoading || attachmentInfoIsLoading)
    return "Loading...";
  
  if (
    entityError ||
    attachmentsError ||
    attachmentInfoError ||
    attachmentInfoIsLoading
  )
    return "Error loading data.";

  const attachedIds = entityData
    ? JSON.parse(entityData?.[attachmentKey] || "[]")
    : [];

  const handleChipClick = (checked, item) => {
    if (checked) {
      const elementToDelete = attachedIds.find(
        (elem) => elem.primary_id === item.id
      );
      if (elementToDelete) {
        deleteMutation.mutate(elementToDelete.relation_id, {
          onError: (error) => {
            console.error("Error deleting relation:", error);
          },
        });
      }
    } else {
      const newEntity = {
        [depsData[attachmentKey].relation.foreign_key_1]: selectedEntityId,
        [depsData[attachmentKey].relation.foreign_key_2]: item.id,
      };
      createMutation.mutate(newEntity, {
        onError: (error) => {
          console.error("Error creating relation:", error);
        },
      });
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset page to 1 whenever search term changes
  };

  const checkedIds = attachedIds.map((item) => item.primary_id);
  const disabled =
    entityIsFetching || createMutation.isPending || deleteMutation.isPending;

  const pageCount = Math.ceil(attachmentsData.total / attachmentsData.per_page);

  return (
    <>
      <DialogTitle>Wybierz {attachmentInfoData?.many}</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <TextField
            label="Szukaj"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        {!!attachmentsData.items.length && (
          <>
            <Typography sx={{ mb: 2 }}>
              Które trzeba dodać do &quot;{entityData?.name}&quot;
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
              {attachmentsData.items?.map((item) => {
                const checked = checkedIds.includes(item.id);
                return (
                  <Chip
                    key={item.id}
                    label={
                      <Tooltip title={`id: ${item.id}`} placement="top">
                        <span>{item.name}</span>
                      </Tooltip>
                    }
                    disabled={disabled}
                    icon={checked ? <LinkOffIcon /> : <AddLinkIcon />}
                    variant={checked ? "filled" : "outlined"}
                    onClick={() => handleChipClick(checked, item)}
                  />
                );
              })}
            </Stack>
            {pageCount > 1 && (
              <Box sx={{ m: 2, display: "flex", justifyContent: "center" }}>
                <Pagination
                  disabled={disabled}
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </>
        )}
        {"plugin" === attachmentInfoData?.type && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <ActionButton
              icon={<AddCircleOutlineIcon />}
              label={`Dodaj ${attachmentInfoData?.whom}`}
              ariaLabel="add"
              onClick={() => {
                handleFormDialogClose();
                handleFormDialogOpen("add");
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormDialogClose}>Zamknij</Button>
      </DialogActions>
    </>
  );
};

EntityAttachForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
  depsData: PropTypes.object.isRequired,
};

export default EntityAttachForm;
