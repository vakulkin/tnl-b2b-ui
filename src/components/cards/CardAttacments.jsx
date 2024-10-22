import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { getEntityStore } from "../../store";
import { useManagement } from "../../useManagement";
import EntityIcon from "../general/EntityIcon";
import ActionButton from "../general/ActionButton";

const CardAttachments = ({
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

  if (attachmentInfoIsLoading)
    return <EntityIcon icon={attachmentKey} size={30} />;
  
  if (attachmentInfoError) return "Error loading data.";

  const itemsIds = entity[attachmentKey]
    ? JSON.parse(entity[attachmentKey])
    : [];

  // const firstWord = "123";
  const firstWord = attachmentInfoData.whom.split(" ")[0].toLowerCase();

  return (
    <Box
      sx={{
        p: 3,
        background: "#ffffff",
        borderRadius: 2,
        border: "1px solid #E2E6EF",
        borderLeft: `5px solid ${attachmentInfoData.color}`,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <EntityIcon icon={attachmentKey} size={30} />
          {attachmentInfoData?.many ?? attachmentKey}
        </Box>
        <ActionButton
          icon={<AddIcon />}
          label={`Przypisz ${firstWord}`}
          ariaLabel={itemsIds.length ? "edit-attachment" : "add-attachment"}
          onClick={() => handleFormDialogOpen("link", entity.id, attachmentKey)}
        />
      </Typography>
      {!!itemsIds.length && (
        <Stack direction="row" sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>
          {itemsIds.map((item, index) => {
            return (
              <React.Fragment key={item.primary_id}>
                {!!index && !!separator.length && (
                  <Chip
                    variant="outlined"
                    label={separator}
                    sx={{
                      ".MuiChip-label": {
                        p: 0,
                      },
                      border: "none",
                    }}
                  />
                )}
                <Chip
                  label={
                    <Tooltip title={`id: ${item.primary_id}`} placement="top">
                      <span>{item.name}</span>
                    </Tooltip>
                  }
                  variant="outlined"
                  sx={{ borderColor: attachmentInfoData.color }}
                />
              </React.Fragment>
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

CardAttachments.propTypes = {
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  attachmentKey: PropTypes.string.isRequired,
  separator: PropTypes.string,
};

export default CardAttachments;
