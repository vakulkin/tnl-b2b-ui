import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { useFormik } from "formik";

import { Box, DialogTitle, DialogContent, Typography } from "@mui/material";
import { getEntityStore } from "../../store";
import {
  useFetchEntityById,
  useFetchEntityList,
  useFetchInfoByKey,
  useCreateEntityMutation,
  useDeleteEntityMutation,
} from "../../useManagement";
import SingleLoader from "../general/SingleLoader";
import AttachedItems from "./AttachedItems";
import AttachmentItems from "./AttachmentItems";
import PaginationComponent from "../general/PaginationComponent";
import AddNewEntityButton from "../buttons/AddNewEntityButton";
import InfoTooltip from "../general/InfoTooltip";
import SearchField from "../general/SearchField";

const EntityAttachForm = ({ entityKey, depsKey, depsData }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const useStoreEntity = getEntityStore(entityKey);
  const { selectedEntityId } = useStoreEntity();

  const useStoreDependency = getEntityStore(depsKey);
  const { handleFormDialogOpen } = useStoreDependency();

  const entityData = useEntityData(entityKey, selectedEntityId);
  const attachmentsData = useAttachmentsData(
    depsKey,
    paginationModel.page,
    debouncedSearchTerm
  );

  const entityInfoData = useAttachmentInfo(entityKey);

  const attachmentInfoData = useAttachmentInfo(depsKey);

  const createMutation = useCreateEntityMutation(depsData.relation.route, [
    [entityKey, "joined"],
    [depsKey, "joined"],
  ]);
  const deleteMutation = useDeleteEntityMutation(depsData.relation.route, [
    [entityKey, "joined"],
    [depsKey, "joined"],
  ]);

  const formik = useFormik({ initialValues: { search: "" } });

  useEffect(() => {
    const handler = debounce((value) => {
      setDebouncedSearchTerm(value);
      setPaginationModel((prev) => ({ ...prev, page: 1 }));
    }, 500);
    handler(formik.values.search);
    return () => handler.cancel();
  }, [formik.values.search]);

  if (
    entityData.isLoading ||
    entityInfoData.isLoading ||
    attachmentsData.isLoading ||
    attachmentInfoData.isLoading
  ) {
    return <SingleLoader icon={depsKey} size={34} />;
  }

  const attachedData = entityData.data
    ? JSON.parse(entityData.data[depsKey] || "[]")
    : [];

  const checkedIds = attachedData.map((item) => parseInt(item.id, 10));

  const disabled =
    entityData.isFetching ||
    entityInfoData.isFetching ||
    attachmentsData.isFetching ||
    createMutation.isPending ||
    deleteMutation.isPending;

  const totalPages = Math.ceil(
    attachmentsData.data.total / attachmentsData.data.per_page
  );

  return (
    <Box sx={formStyles.container(attachmentInfoData.data.color)}>
      <DialogTitle>
        <InfoTooltip field={depsKey}>
          <Typography variant="h2">
            Wybierz {attachmentInfoData.data?.many.toLowerCase()}
          </Typography>
        </InfoTooltip>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h4">
          Do których należy dodać {entityInfoData.data?.whom.toLowerCase()}{" "}
          &quot;{entityData.data?.name}&quot;
        </Typography>
        <AttachedItems attachedData={attachedData} />
        <SearchField
          entityKey={entityKey}
          searchTerm={formik.values.search}
          onSearchChange={formik.handleChange}
        />
        {!!attachmentsData.data.items.length && (
          <AttachmentItems
            items={attachmentsData.data.items}
            checkedIds={checkedIds}
            disabled={disabled}
            handleChipClick={(checked, item) =>
              handleChipClick(
                checked,
                item,
                attachedData,
                createMutation,
                deleteMutation,
                selectedEntityId,
                depsData
              )
            }
          />
        )}
        {totalPages > 1 && (
          <PaginationComponent
            disabled={disabled}
            totalPages={totalPages}
            paginationModel={paginationModel.page}
            onPageChange={(event, value) => {
              setPaginationModel((prev) => ({ ...prev, page: value }));
            }}
          />
        )}
        {attachmentInfoData.data?.type === "plugin" && (
          <AddNewEntityButton
            attachmentInfoData={attachmentInfoData.data}
            handleFormDialogOpen={handleFormDialogOpen}
          />
        )}
      </DialogContent>
    </Box>
  );
};

const formStyles = {
  container: (color) => ({
    height: "100%",
    background: "#ffffff",
    border: "1px solid #ccc",
    borderLeftColor: color,
    borderLeftWidth: 7,
  }),
};

export default EntityAttachForm;

// Utility hooks
const useEntityData = (entityKey, selectedEntityId) =>
  useFetchEntityById(entityKey, "joined", selectedEntityId);

const useAttachmentsData = (depsKey, page, searchTerm) =>
  useFetchEntityList(depsKey, "simple", { page, search: searchTerm });

const useAttachmentInfo = (depsKey) => useFetchInfoByKey(depsKey);

const handleChipClick = (
  checked,
  item,
  attachedData,
  createMutation,
  deleteMutation,
  selectedEntityId,
  depsData
) => {
  if (checked) {
    const elementToDelete = attachedData.find(
      (elem) => elem.id === parseInt(item.id, 10)
    );
    if (elementToDelete) {
      deleteMutation.mutate(elementToDelete.rel_id);
    }
  } else {
    const newEntity = {
      [depsData.relation.foreign_key_1]: selectedEntityId,
      [depsData.relation.foreign_key_2]: item.id,
    };
    createMutation.mutate(newEntity);
  }
};
