import PropTypes from "prop-types";
import { Stack, Chip, Tooltip } from "@mui/material";
import { getEntityStore } from "../store";
import { useFetchInfoByKey } from "../useManagement";
import EntityIcon from "./general/EntityIcon";

// Utility function to format labels
const formatLabel = (label) => {
  const trimmed = label.toLowerCase().trim();
  return trimmed.length > 20
    ? `${trimmed.substring(0, 15).trim()}...`
    : trimmed;
};

// Styles defined outside the component to prevent re-creation on each render
const chipBaseStyle = (color) => ({
  fontSize: ".75rem",
  height: "20px",
  borderColor: `${color}B3`,
  background: `${color}0D`,
});

const emptyIconChipStyle = {
  px: 0.5,
  "&:hover": {
    opacity: 1,
  },
  "& .MuiChip-label": {
    display: "none",
  },
};

const iconOnlyChipStyle = {
  background: "none",
  border: "none",
};

const LimitedChips = ({
  items,
  maxVisibleItems = 1,
  entityKey,
  entity,
  attachmentKey,
  prefix = "",
  postfix = "",
}) => {
  // Correctly accessing the store using the hook returned by getEntityStore
  const useStore = getEntityStore(entityKey);
  const handleFormDialogOpen = useStore((state) => state.handleFormDialogOpen);

  const itemCount = items.length;
  const visibleItems = items.slice(0, maxVisibleItems);
  const remainingCount = itemCount - maxVisibleItems;

  const { data: infoData, isLoading, error } = useFetchInfoByKey(attachmentKey);

  if (isLoading) {
    return <EntityIcon icon={attachmentKey} size={14} />;
  }

  if (error) {
    return "Error loading data.";
  }

  // Generates the tooltip title based on the number of items
  const generateTooltipTitle = (displayItems) => {
    const prefixText = displayItems.length > 1 ? `${prefix} ` : "";
    const names = displayItems.map(({ name }) => name).join(", ");
    return `${prefixText}${infoData.singular.toLowerCase()}: ${names}${postfix}`;
  };

  // Render function for the "No Items" case
  const renderNoItemsChip = () => (
    <Tooltip title={`Dołącz ${infoData.many.toLowerCase()}`} arrow>
      <Chip
        icon={<EntityIcon icon={attachmentKey} size={14} />}
        variant="outlined"
        size="small"
        clickable
        sx={{
          ...chipBaseStyle(infoData.color),
          ...emptyIconChipStyle,
          ...iconOnlyChipStyle,
          opacity: 0.4,
        }}
        onClick={() => handleFormDialogOpen("link", entity.id, attachmentKey)}
      />
    </Tooltip>
  );

  // Render function for individual chips when items are present
  const renderChip = (item, index) => {
    const isFirst = index === 0;
    const shouldAppendRemaining = isFirst && remainingCount > 0;
    const label = shouldAppendRemaining
      ? `${formatLabel(item.name)} +${remainingCount}`
      : formatLabel(item.name);

    const tooltipTitle = isFirst
      ? // && maxVisibleItems > 1
        generateTooltipTitle(items)
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
          onClick={
            isFirst
              ? () => handleFormDialogOpen("link", entity.id, attachmentKey)
              : undefined
          }
          icon={
            isFirst ? <EntityIcon icon={attachmentKey} size={14} /> : undefined
          }
        />
      </Tooltip>
    );
  };

  return (
    <Stack direction="row" flexWrap="wrap" gap={0.5}>
      {itemCount === 0 ? renderNoItemsChip() : visibleItems.map(renderChip)}
    </Stack>
  );
};

LimitedChips.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  maxVisibleItems: PropTypes.number,
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.object.isRequired,
  attachmentKey: PropTypes.any.isRequired,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
};

export default LimitedChips;
