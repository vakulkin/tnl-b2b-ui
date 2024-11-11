import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import {
  Box,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Chip,
  Tooltip,
  Pagination,
  TextField,
} from "@mui/material";
import AddLinkIcon from "@mui/icons-material/AddLink";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { getEntityStore } from "../../../store";
import {
  useFetchEntityById,
  useFetchEntityList,
  useFetchInfoByKey,
  useCreateEntityMutation,
  useDeleteEntityMutation,
} from "../../../useManagement";
import ActionButton from "../ActionButton";
import SingleLoader from "../SingleLoader";

const EntityAttachForm = ({ entityKey, depsKey, depsData }) => {
  const [page, setPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const useStore = getEntityStore(entityKey);
  const { selectedEntityId, handleFormDialogOpen, handleFormDialogClose } =
    useStore();

  // Fetch the entity data
  const { data: entityData, isLoading: entityIsLoading } = useFetchEntityById(
    entityKey,
    selectedEntityId,
    "joined"
  );

  // Fetch the attachments
  const { data: attachmentsData, isLoading: attachmentsIsLoading } =
    useFetchEntityList(depsKey, "simple", {
      page,
      search: debouncedSearchTerm,
    });

  // Fetch attachment info
  const { data: attachmentInfoData, isLoading: attachmentInfoIsLoading } =
    useFetchInfoByKey(depsKey);

  // Mutation hooks for creating and deleting relationships
  const createMutation = useCreateEntityMutation(depsData.relation.route, [
    [entityKey, selectedEntityId, "joined"],
    [entityKey, "joined"],
  ]);
  const deleteMutation = useDeleteEntityMutation(depsData.relation.route, [
    [entityKey, selectedEntityId, "joined"],
    [entityKey, "joined"],
  ]);

  // Formik setup
  const formik = useFormik({
    initialValues: { search: "" },
  });

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

  if (entityIsLoading || attachmentsIsLoading || attachmentInfoIsLoading) {
    return <SingleLoader icon={depsKey} size={34} />;
  }

  const attachedIds = entityData ? JSON.parse(entityData[depsKey] || "[]") : [];

  const handleChipClick = (checked, item) => {
    if (checked) {
      const elementToDelete = attachedIds.find((elem) => elem.id === item.id);
      if (elementToDelete) {
        deleteMutation.mutate(elementToDelete.rel_id, {
          onError: (error) => {
            console.error("Error deleting relation:", error);
          },
        });
      }
    } else {
      const newEntity = {
        [depsData.relation.foreign_key_1]: selectedEntityId,
        [depsData.relation.foreign_key_2]: item.id,
      };
      createMutation.mutate(newEntity);
    }
  };

  const handlePageChange = (event, value) => setPage(value);

  const checkedIds = attachedIds.map((item) => item.id);
  const disabled =
    entityIsLoading || createMutation.isLoading || deleteMutation.isLoading;
  const pageCount = Math.ceil(attachmentsData.total / attachmentsData.per_page);

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderLeftColor: attachmentInfoData.color,
        borderLeftWidth: 7,
      }}
    >
      <DialogTitle>Select {attachmentInfoData?.many.toLowerCase()}</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <TextField
            label="Search"
            size="small"
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
              Which need to be added to {entityData?.name}
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
              {attachmentsData.items.map((item) => {
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
              icon={<AddLinkIcon />}
              label={`Add ${attachmentInfoData?.whom.toLowerCase()}`}
              ariaLabel="add"
              onClick={() => {
                handleFormDialogClose();
                handleFormDialogOpen("add");
              }}
            />
          </Box>
        )}
      </DialogContent>
    </Box>
  );
};

EntityAttachForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
  depsKey: PropTypes.string.isRequired,
  depsData: PropTypes.object.isRequired,
};

export default EntityAttachForm;
