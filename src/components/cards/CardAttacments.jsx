import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import EntityIcon from "../general/EntityIcon";
import PropTypes from "prop-types";
import { useFetchInfoByKey } from "../../useManagement";

const CardAttachments = ({ entity, attachmentKey }) => {

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

  return (
    <CardAttachmentsWrapper color={attachmentInfoData.color}>
      <CardAttachmentsHeader title={attachmentInfoData?.many ?? attachmentKey} />
      <CardAttachmentsChips items={itemsIds} />
    </CardAttachmentsWrapper>
  );
};

const CardAttachmentsWrapper = ({ children, color }) => (
  <Box
    sx={{
      p: 3,
      pt: 2,
      height: "100%",
      background: "#ffffff",
      borderRadius: 2,
      border: "1px solid #E2E6EF",
      borderLeft: `5px solid ${color}`,
    }}
  >
    {children}
  </Box>
);

CardAttachmentsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

const CardAttachmentsHeader = ({ title }) => (
  <Typography
    variant="h3"
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {title}
  </Typography>
);

CardAttachmentsHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

const CardAttachmentsChips = ({ items }) => (
  !!items.length && (
    <Stack direction="row" sx={{ mt: 2, flexWrap: "wrap", gap: 0.5 }}>
      {items.map((item) => (
        <CardAttachmentChip key={item.id} item={item} />
      ))}
    </Stack>
  )
);

CardAttachmentsChips.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const CardAttachmentChip = ({ item }) => (
  <Tooltip key={item.id} title={`id: ${item.id}`} placement="top">
    <Chip label={item.name} variant="outlined" size="small" />
  </Tooltip>
);

CardAttachmentChip.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

CardAttachments.propTypes = {
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  attachmentKey: PropTypes.string.isRequired,
};

export default CardAttachments;
