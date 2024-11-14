import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid2,
} from "@mui/material";
import { Field } from "formik";

const FormField = ({ field, values, handleChange, errors, touched }) => {
  const isError = Boolean(touched[field.name] && errors[field.name]);

  return (
    <Grid2 size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
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
    </Grid2>
  );
};

export default FormField;
