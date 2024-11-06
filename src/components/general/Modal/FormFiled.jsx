import PropTypes from "prop-types";
import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { Field } from "formik";

const FormField = ({ field, values, handleChange, errors, touched }) => {
  const isError = Boolean(touched[field.name] && errors[field.name]);

  return (
    <FormControl fullWidth margin="normal" error={isError}>
      {field.type === "select" ? (
        <>
          <InputLabel shrink>{field.name}</InputLabel>
          <Field
            as={Select}
            name={field.name}
            label={field.name}
            value={values[field.name]}
            onChange={handleChange}
          >
            {field.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Field>
          {isError && <FormHelperText>{errors[field.name]}</FormHelperText>}
        </>
      ) : (
        <>
          <Field
            as={TextField}
            // type={field.type}
            name={field.name}
            label={field.name}
            value={values[field.name]}
            onChange={handleChange}
            error={isError}
            helperText={isError && errors[field.name]}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      )}
    </FormControl>
  );
};

FormField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  }).isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
};

export default FormField;
