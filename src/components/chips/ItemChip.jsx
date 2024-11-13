import { Chip, Tooltip } from "@mui/material";
import EntityIcon from "../general/EntityIcon";
import { formatLabel, chipBaseStyle } from "../../helpers";

const ItemChip = ({
  item,
  index,
  visibleItems,
  items,
  remainingCount,
  infoData,
  handleFormDialogOpen,
  entity,
  attachmentKey,
  totalSymbols,
  prefix,
  postfix,
}) => {
  const isFirst = index === 0;
  const isLast = index + 1 === visibleItems.length;
  const shouldAppendRemaining = isLast && remainingCount > 0;
  const label = shouldAppendRemaining
    ? `${formatLabel(item.name, visibleItems.length, totalSymbols)} +${remainingCount}`
    : formatLabel(item.name, visibleItems.length, totalSymbols);

  const tooltipTitle = shouldAppendRemaining
    ? `${prefix} ${infoData.singular}: ${items.map(({ name }) => name).join(", ")}${postfix}`
    : `${item.id}: ${item.name}`;

  return (
    <Tooltip key={item.id} title={tooltipTitle} arrow>
      <Chip
        label={label}
        variant="outlined"
        size="small"
        sx={{
          ...chipBaseStyle(infoData.color),
          pl: isFirst ? 1 : undefined,
        }}
        onClick={() => handleFormDialogOpen("link", entity.id, attachmentKey)}
        icon={
          isFirst ? <EntityIcon icon={attachmentKey} size={14} /> : undefined
        }
      />
    </Tooltip>
  );
};

export default ItemChip;
