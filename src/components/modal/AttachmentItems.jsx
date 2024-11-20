import { Stack, Chip, Tooltip } from "@mui/material";
import AddLinkIcon from "@mui/icons-material/AddLink";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { formatLabel } from "../../helpers";

const AttachmentItems = ({ items, checkedIds, disabled, handleChipClick }) => (
  <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
    {items.map((item) => {

      
      const checked = checkedIds.includes(parseInt(item.id, 10));
      return (
        <Tooltip
          key={item.id}
          title={`id: ${item.id}`}
          placement="bottom"
          arrow
        >
          <Chip
            label={formatLabel(item.name, items.length, 200)}
            disabled={disabled}
            icon={checked ? <LinkOffIcon /> : <AddLinkIcon />}
            variant={checked ? "filled" : "outlined"}
            onClick={() => handleChipClick(checked, item)}
            size="small"
          />
        </Tooltip>
      );
    })}
  </Stack>
);

export default AttachmentItems;
