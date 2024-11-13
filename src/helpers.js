import * as Yup from "yup";

export const formatLabel = (label, visibleItems, totalSymbols) => {
  const trimmed = label.toLowerCase().trim();
  const itemlength = Math.max(17, parseInt(totalSymbols / visibleItems));
  return trimmed.length >= itemlength
    ? `${trimmed.substring(0, itemlength).trim()}...`
    : trimmed;
};

export const chipBaseStyle = (color) => ({
  fontSize: ".75rem",
  height: "20px",
  borderColor: `${color}B3`,
  background: `${color}0D`,
});

export const emptyIconChipStyle = (emptyIcon) =>
  emptyIcon
    ? {
        px: 0.5,
        opacity: 0.4,
        "&:hover": {
          opacity: 1,
        },
        "& .MuiChip-label": {
          display: "none",
        },
      }
    : {};

export const iconOnlyChipStyle = {
  background: "none",
  border: "none",
};


export const convertToYupSchema = (fields) => {
  const shape = {};

  fields.forEach((field) => {
    const validations = field.validation || [];
    let validator = null;

    validations.forEach(({ rule, params }) => {
      switch (rule) {
        case "string":
          validator = (validator || Yup.string()).typeError(
            "Must be a string"
          );
          break;
        case "integer":
          validator = (validator || Yup.number().integer()).typeError(
            "Must be an integer"
          );
          break;
        case "number":
          validator = (validator || Yup.number()).typeError(
            "Must be a number"
          );
          break;
        case "maxLength":
          validator = (validator || Yup.string()).max(
            params,
            `Maximum length is ${params}`
          );
          break;
        case "min":
          validator = (validator || Yup.number()).min(
            params,
            `Minimum value is ${params}`
          );
          break;
        case "notEmpty":
          validator = (validator || Yup.mixed()).required(
            "This field is required"
          );
          break;
        case "oneOf":
          validator = (validator || Yup.mixed()).oneOf(
            field.options,
            `Must be one of: ${field.options.join(", ")}`
          );
          break;
        default:
          break;
      }
    });

    if (!validator) {
      switch (field.type) {
        case "text":
          validator = Yup.string();
          break;
        case "number":
          validator = Yup.number().typeError("Must be a number");
          break;
        case "select":
          validator = Yup.mixed();
          break;
        default:
          validator = Yup.mixed();
      }
    }

    shape[field.name] = validator;
  });

  return Yup.object().shape(shape);
};