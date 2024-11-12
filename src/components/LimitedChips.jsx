import PropTypes from "prop-types";
import { Stack, Chip, Tooltip } from "@mui/material";
import { getEntityStore } from "../store";
import { useFetchInfoByKey } from "../useManagement";
import EntityIcon from "./general/EntityIcon";

// Helper function to format labels: trim spaces and limit to 25 characters
const formatLabel = (label) => {
  const trimmedLabel = label.toLowerCase().trim();
  return trimmedLabel.length > 15
    ? `${trimmedLabel.substring(0, 15).trim()}...`
    : trimmedLabel;
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
  const itemCount = items.length;
  const visibleItems = items.slice(0, maxVisibleItems);
  const remainingItems = items.slice(maxVisibleItems);
  const remainingCount = remainingItems.length;

  const useStore = getEntityStore(entityKey);
  const { handleFormDialogOpen } = useStore();

  const {
    data: infoData,
    isLoading: infoIsLoading,
    error: infoError,
  } = useFetchInfoByKey(attachmentKey);

  // Helper function to generate tooltip title with prefix and postfix
  const generateTooltipTitle = (items) =>
    `${prefix} ${infoData.singular.toLowerCase()}: ${items.map((item) => item.name).join(", ")}${postfix}`;

  if (infoIsLoading) return <EntityIcon icon={attachmentKey} size={14} />;

  if (infoError) return "Error loading data.";

  const chipStyle = {
    fontSize: ".75rem",
    height: "20px",
    borderColor: `${infoData.color}B3`,
    background: `${infoData.color}0D`,
  };

  let firstChipLabel = "";

  if (itemCount === 1) {
    firstChipLabel = formatLabel(items[0].name);
  } else {
    firstChipLabel =
      maxVisibleItems === 0
        ? `${prefix} ${infoData.singular.split(" ")[0].toLowerCase()}: ${itemCount}`
        : infoData.many.split(" ")[0].toLowerCase();
  }

  const firstChipTooltipTitle =
    maxVisibleItems === 0 ? generateTooltipTitle(items) : `Dołącz ${infoData.many.toLowerCase()}`;

  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
      <Tooltip title={firstChipTooltipTitle} arrow>
        <Chip
          icon={<EntityIcon icon={attachmentKey} size={12} />}
          label={firstChipLabel}
          variant="outlined"
          size="small"
          sx={{ ...chipStyle, pl: 1 }}
          onClick={() => handleFormDialogOpen("link", entity.id, attachmentKey)}
        />
      </Tooltip>

      {visibleItems.map((item) => (
        <Tooltip key={item.id} title={`${item.id}: ${item.name}`} arrow>
          <Chip
            label={formatLabel(item.name)}
            variant="outlined"
            size="small"
            sx={chipStyle}
          />
        </Tooltip>
      ))}

      {remainingCount > 0 && maxVisibleItems > 0 && (
        <Tooltip title={generateTooltipTitle(remainingItems)} arrow>
          <Chip
            label={`+${remainingCount}`}
            variant="outlined"
            size="small"
            sx={chipStyle}
          />
        </Tooltip>
      )}
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
