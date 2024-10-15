import { Chip } from "@mui/material";
import PropTypes from "prop-types";

const formatKindValue = (kind, value) => {
  switch (kind) {
    case "equals":
      return `= ${value} .-`; // Price equals a fixed value
    case "minus_percent":
      return `- ${value}%`; // Decrease by percentage
    case "plus_percent":
      return `+ ${value}%`; // Increase by percentage
    case "minus_number":
      return `- ${value} .-`; // Decrease by a fixed amount
    case "plus_number":
      return `+ ${value} .-`; // Increase by a fixed amount
    default:
      return value; // Fallback for unknown kinds
  }
};

const RuleChips = ({ rule }) => {
  return (
    <>
      <Chip label={rule.active === "1" ? "active" : "inactive"} />
      <Chip label={`priority: ${rule.priority}`} />
      <Chip label={formatKindValue(rule.kind, rule.value)} />
    </>
  );
};

RuleChips.propTypes = {
  rule: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    priority: PropTypes.string.isRequired,
    kind: PropTypes.oneOf(['minus_percent', 'plus_percent', 'minus_number', 'plus_number', 'equals']).isRequired,
    value: PropTypes.string.isRequired,
    active: PropTypes.oneOf(["1", "0"]).isRequired,
    logic_blocks: PropTypes.string,
  }).isRequired,
};

export default RuleChips;
