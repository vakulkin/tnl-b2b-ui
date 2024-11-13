import PropTypes from "prop-types";
import {
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";


const AttachedItems = ({ attachedData }) => (
  <Stack direction="row" sx={{ mt: 2, flexWrap: "wrap", gap: 0.5 }}>
    {attachedData.map((item) => (
      <Tooltip key={item.id} title={`id: ${item.id}`} placement="bottom" arrow>
        <Chip label={item.name} variant="outlined" size="small" />
      </Tooltip>
    ))}
  </Stack>
);

AttachedItems.propTypes = {
  attachedData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AttachedItems;
