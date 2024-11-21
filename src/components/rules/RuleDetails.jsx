import { Chip } from "@mui/material";
import { formatKindValue } from "../../helpers";

const RuleChips = ({ rule }) => {
  const chipData = [
    { label: rule.status === "1" ? "status" : "inactive" },
    { label: `priority: ${rule.priority}` },
    { label: formatKindValue(rule.kind, rule.value) },
    rule.operation_value && { label: formatKindValue(rule.operation, rule.operation_value) },
    { label: `min qty: ${rule.min_qty}` },
    { label: `max qty: ${rule.max_qty}` },
    { label: `table: ${rule.show_table}` },
  ].filter(Boolean);

  return (
    <>
      {chipData.map((chip, index) => (
        <Chip key={index} sx={{ borderRadius: 2 }} label={chip.label} />
      ))}
    </>
  );
};

export default RuleChips;
