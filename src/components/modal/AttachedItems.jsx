import { Stack, Chip, Tooltip } from "@mui/material";
import { formatLabel } from "../../helpers";

const AttachedItems = ({ attachedData }) => (
  <Stack direction="row" sx={{ mt: 2, flexWrap: "wrap", gap: 0.5 }}>
    {attachedData.map((item) => (
      <Tooltip
        key={item.id}
        title={`${item.id}: ${item.name}`}
        placement="bottom"
        arrow
      >
        <Chip
          label={formatLabel(item.name, attachedData.length, 250)}
          variant="outlined"
          size="small"
        />
      </Tooltip>
    ))}
  </Stack>
);

export default AttachedItems;
