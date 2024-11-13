import { Chip } from "@mui/material";
import { formatKindValue } from "../../helpers";

const RuleChips = ({ rule }) => {
  const chipData = [
    { label: rule.active === "1" ? "active" : "inactive" },
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

// RuleChips.propTypes = {
//   rule: PropTypes.shape({
//     name: PropTypes.string,
//     id: PropTypes.string,
//     created_at: PropTypes.string,
//     updated_at: PropTypes.string,
//     priority: PropTypes.string.isRequired,
//     kind: PropTypes.oneOf(["minus_percent", "plus_percent", "minus_number", "plus_number", "equals", "request_quote"]).isRequired,
//     value: PropTypes.string.isRequired,
//     active: PropTypes.oneOf(["1", "0"]).isRequired,
//     logic_blocks: PropTypes.string,
//     operation: PropTypes.string,
//     operation_value: PropTypes.string,
//     min_qty: PropTypes.string,
//     max_qty: PropTypes.string,
//     show_table: PropTypes.string,
//   }).isRequired,
// };

export default RuleChips;
