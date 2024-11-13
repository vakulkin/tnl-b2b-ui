import PropTypes from "prop-types";
import {
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import AddLinkIcon from "@mui/icons-material/AddLink";
import LinkOffIcon from "@mui/icons-material/LinkOff";


const AttachmentItems = ({ items, checkedIds, disabled, handleChipClick }) => (
  <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
    {items.map((item) => {
      const checked = checkedIds.includes(item.id);
      return (
        <Chip
          key={item.id}
          label={
            <Tooltip title={`id: ${item.id}`} placement="bottom" arrow>
              <span>{item.name}</span>
            </Tooltip>
          }
          disabled={disabled}
          icon={checked ? <LinkOffIcon /> : <AddLinkIcon />}
          variant={checked ? "filled" : "outlined"}
          onClick={() => handleChipClick(checked, item)}
          size="small"
        />
      );
    })}
  </Stack>
);

AttachmentItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  checkedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
  disabled: PropTypes.bool.isRequired,
  handleChipClick: PropTypes.func.isRequired,
};

export default AttachmentItems;