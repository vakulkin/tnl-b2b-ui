import PropTypes from "prop-types";
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

ItemChip.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  visibleItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  remainingCount: PropTypes.number.isRequired,
  infoData: PropTypes.shape({
    color: PropTypes.string.isRequired,
    singular: PropTypes.string.isRequired,
  }).isRequired,
  handleFormDialogOpen: PropTypes.func.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.any.isRequired,
  }).isRequired,
  attachmentKey: PropTypes.any.isRequired,
  totalSymbols: PropTypes.number.isRequired,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
};

export default ItemChip;
