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

export default FormField;
