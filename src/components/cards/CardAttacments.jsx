import React from "react";
import { Box, Typography, Stack, Chip, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { getEntityStore } from "../../store";
import { useManagement } from "../../useManagement";

const CardAttacments = ({
  entityKey,
  entity,
  attachmentKey,
  separator = "",
}) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const { useEntitiesQuery } = useManagement(attachmentKey);

  const {
    data: attachmentInfoData,
    isLoading: attachmentInfoIsLoading,
    error: attachmentInfoError,
  } = useEntitiesQuery("info");

  if (attachmentInfoIsLoading) return "Loading...";
  if (attachmentInfoError) return "Error loading data.";

  const itemsIds = entity[attachmentKey]
    ? JSON.parse(entity[attachmentKey])
    : [];

  return (
    <Box
      sx={{
        p: 2,
        background: "#ffffff",
        borderRadius: 4,
        boxShadow: "rgba(0, 0, 0, 0.04) 0px 2px 4px",
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontSize: 16, mb: 1, color: "#2C3E50" }}
      >
        {attachmentInfoData?.many ?? attachmentKey}:
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
        <Chip
          icon={itemsIds.length ? <EditOutlinedIcon /> : <AddIcon />}
          label={itemsIds.length ? "Edytuj" : "Dodaj"}
          variant="outlined"
          size="small"
          onClick={() => handleFormDialogOpen("link", entity.id, attachmentKey)}
        />
        {itemsIds.map((item, index) => {
          return (
            <React.Fragment key={item.primary_id}>
              {!!index && !!separator.length && (
                <Chip size="small" variant="outlined" label={separator} />
              )}
              <Chip
                label={
                  <Tooltip title={`id: ${item.primary_id}`} placement="top">
                    <span>{item.name}</span>
                  </Tooltip>
                }
                size="small"
              />
            </React.Fragment>
          );
        })}
      </Stack>
    </Box>
  );
};

CardAttacments.propTypes = {
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  attachmentKey: PropTypes.string.isRequired,
  separator: PropTypes.string.isRequired,
};

export default CardAttacments;
