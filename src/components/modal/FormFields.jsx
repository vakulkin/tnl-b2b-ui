import { Grid2 } from "@mui/material";
import FormField from "./FormFiled";

const FormFields = ({
  entityKey,
  fieldsList,
  values,
  handleChange,
  errors,
  touched,
  disabled,
}) => {
  return (
    <Grid2 container spacing={2}>
      {fieldsList.map((field) => (
        <FormField
          entityKey={entityKey}
          key={field.name}
          field={field}
          values={values}
          handleChange={handleChange}
          errors={errors}
          touched={touched}
          disabled={disabled}
        />
      ))}
    </Grid2>
  );
};

export default FormFields;
