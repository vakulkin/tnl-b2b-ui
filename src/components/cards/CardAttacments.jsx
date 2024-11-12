import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { getEntityStore } from "../../store";
import EntityIcon from "../general/EntityIcon";
import ActionButton from "../general/ActionButton";
import { useFetchInfoByKey } from "../../useManagement";

const CardAttachments = ({ entityKey, entity, attachmentKey }) => {
  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const {
    data: attachmentInfoData,
    isLoading: attachmentInfoIsLoading,
    error: attachmentInfoError,
  } = useFetchInfoByKey(attachmentKey);

  if (attachmentInfoIsLoading)
    return <EntityIcon icon={attachmentKey} size={20} />;

  if (attachmentInfoError) return "Error loading data.";

  const itemsIds = entity[attachmentKey]
    ? JSON.parse(entity[attachmentKey])
    : [];

  const firstWord = attachmentInfoData?.whom?.split(" ")[0].toLowerCase();

  return (
    <Box
      sx={{
        p: 3,
        pt: 2,
        height: "100%",
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
        {attachmentInfoData?.many ?? attachmentKey}
      </Typography>
      {!!itemsIds.length && (
        <Stack direction="row" sx={{ mt: 2, flexWrap: "wrap", gap: 0.5 }}>
          {itemsIds.map((item) => {
            return (
              <Tooltip key={item.id} title={`id: ${item.id}`} placement="top">
                <Chip label={item.name} variant="outlined" size="small" />
              </Tooltip>
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
