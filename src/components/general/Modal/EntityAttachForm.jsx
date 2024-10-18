import { useState, useEffect } from "react";
import debounce from "lodash/debounce"; // Import debounce from lodash
import { useFormik } from "formik"; // Import useFormik from formik
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
import SingleLoader from "../SingleLoader";

const EntityAttachForm = ({ entityKey, depsData }) => {
  // Hooks and state declarations
  const [page, setPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const useStore = getEntityStore(entityKey);
  const { selectedEntityId, attachmentKey, handleFormDialogClose } = useStore();

  const { useEntityQuery } = useManagement(entityKey);
  const { useEntitiesQuery: useEntitiesQueryAttachments } = useManagement(attachmentKey);
  const { createMutation, deleteMutation } = useManagement(depsData[attachmentKey].relation.route);
  const { handleFormDialogOpen } = getEntityStore(attachmentKey)();

  // Formik for handling form state
  const formik = useFormik({
    initialValues: {
      search: "",
    },
  });

  // Debounced handler using lodash
  useEffect(() => {
    const handler = debounce((value) => {
      setDebouncedSearchTerm(value);
      setPage(1);
    }, 500);

    handler(formik.values.search);

    return () => {
      handler.cancel();
    };
  }, [formik.values.search]);

  const {
    data: entityData,
    isFetching: entityIsFetching,
    isLoading: entityIsLoading,
    error: entityError,
  } = useEntityQuery(selectedEntityId, "joined");

  const {
    data: attachmentsData,
    isLoading: attachmentsIsLoading,
    error: attachmentsError,
  } = useEntitiesQueryAttachments("simple", {
    page,
    search: debouncedSearchTerm,
  });

  const {
    data: attachmentInfoData,
    isLoading: attachmentInfoIsLoading,
    error: attachmentInfoError,
  } = useEntitiesQueryAttachments("info");

  if (entityIsLoading || attachmentsIsLoading || attachmentInfoIsLoading) {
    return <SingleLoader icon={attachmentKey} size={40} />;
  }

  if (
    entityError ||
    attachmentsError ||
    attachmentInfoError ||
    attachmentInfoIsLoading
  ) {
    return "Error loading data.";
  }

  // Functions
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

  const checkedIds = attachedIds.map((item) => item.primary_id);
  const disabled =
    entityIsFetching || createMutation.isPending || deleteMutation.isPending;

  const pageCount = Math.ceil(attachmentsData.total / attachmentsData.per_page);

  return (
    <>
      <DialogTitle>Wybierz {attachmentInfoData?.many.toLowerCase()}</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <TextField
            label="Szukaj"
            variant="outlined"
            fullWidth
            name="search"
            value={formik.values.search}
            onChange={formik.handleChange}
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
              label={`Dodaj ${attachmentInfoData?.whom.toLowerCase()}`}
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
