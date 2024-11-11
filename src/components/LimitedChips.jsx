import PropTypes from "prop-types";
import { Stack, Chip, Tooltip } from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { getEntityStore } from "../store";
import { useFetchInfoByKey } from "../useManagement";
import EntityIcon from "./general/EntityIcon";

// Helper function to format labels: trim spaces and limit to 25 characters
const formatLabel = (label) => {
  const trimmedLabel = label.split(" ")[0].toLowerCase().trim();
  return trimmedLabel.length > 25
    ? `${trimmedLabel.substring(0, 22)}...`
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

  // Helper function to generate tooltip title with prefix and postfix
  const generateTooltipTitle = (items) =>
    `${prefix}${items.map((item) => item.name).join(", ")}${postfix}`;

  const {
    data: infoData,
    isLoading: infoIsLoading,
    error: infoError,
  } = useFetchInfoByKey(attachmentKey);

  if (infoIsLoading) return <EntityIcon icon={attachmentKey} size={20} />;

  if (infoError) return "Error loading data.";

  const chipStyle = {
    fontSize: "0.75rem",
    height: "20px",
    borderColor: `${infoData.color}B3`,
    background: `${infoData.color}0D`,
  };

  const firstChipLabel =
    maxVisibleItems === 0
      ? `${formatLabel(infoData.many)} (${itemCount})`
      : formatLabel(infoData.many);

  const firstChipTooltipTitle =
    maxVisibleItems === 0 ? generateTooltipTitle(items) : "Dołącz";

  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
      {/* First Chip */}
      <Tooltip title={firstChipTooltipTitle} arrow>
        <Chip
          icon={<InsertLinkIcon />}
          label={firstChipLabel}
          variant="outlined"
          size="small"
          sx={chipStyle}
          onClick={() => handleFormDialogOpen("link", entity.id, attachmentKey)}
        />
      </Tooltip>

      {/* Visible Items */}
      {visibleItems.map((item) => (
        <Tooltip key={item.id} title={`id: ${item.id}`} arrow>
          <Chip
            label={formatLabel(item.name)}
            variant="outlined"
            size="small"
            sx={chipStyle}
          />
        </Tooltip>
      ))}

      {/* "+N" Chip with Tooltip */}
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
