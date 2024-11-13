import { Chip, Tooltip } from "@mui/material";
import EntityIcon from "../general/EntityIcon";
import { chipBaseStyle, emptyIconChipStyle, iconOnlyChipStyle } from "../../helpers";

const NoItemsChip = ({ infoData, emptyIcon, handleFormDialogOpen, entity, attachmentKey }) => (
  <Tooltip title={`Dołącz ${infoData.many.toLowerCase()}`} arrow>
    <Chip
      icon={<EntityIcon icon={attachmentKey} size={14} />}
      label="dodaj"
      variant="outlined"
      size="small"
      clickable
      sx={{
        pl: 1,
        ...chipBaseStyle(infoData.color),
        ...emptyIconChipStyle(emptyIcon),
        ...iconOnlyChipStyle,
      }}
      onClick={() => handleFormDialogOpen("link", entity.id, attachmentKey)}
    />
  </Tooltip>
);

export default NoItemsChip;
