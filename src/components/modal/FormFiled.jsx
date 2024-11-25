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
import { useFetchColumnByKey } from "../../useManagement";

const FormField = ({
  entityKey,
  field,
  values,
  handleChange,
  errors,
  touched,
  disabled,
}) => {
  const isError = Boolean(touched[field.name] && errors[field.name]);

  const {
    data: columnData,
    isLoading: columnIsLoading,
    isError: columnIsError,
  } = useFetchColumnByKey(entityKey);

  if (columnIsError) return <div>Error loading data.</div>;

  const label = columnData?.[field.name]?.name ?? field.name;

  return (
    <Grid2 size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
      <FormControl fullWidth margin="normal" error={isError}>
        {field.type === "select" ? (
          <>
            <InputLabel shrink>{label}</InputLabel>
            <Select
              name={field.name}
              label={label}
              value={values[field.name]}
              onChange={handleChange}
              disabled={disabled || columnIsLoading}
            >
              {field.options.map((option) => (
                <MenuItem key={option.key} value={option.key}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
            {isError && <FormHelperText>{errors[field.name]}</FormHelperText>}
          </>
        ) : (
          <>
            <Field
              as={TextField}
              name={field.name}
              label={label}
              value={values[field.name]}
              onChange={handleChange}
              error={isError}
              helperText={isError && errors[field.name]}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              disabled={disabled}
            />
          </>
        )}
      </FormControl>
    </Grid2>
  );
};

export default FormField;
