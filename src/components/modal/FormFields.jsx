import FormField from "./FormFiled";

const FormFields = ({ fieldsList, values, handleChange, errors, touched }) => {
  return fieldsList.map((field) => (
    <FormField
      key={field.name}
      field={field}
      values={values}
      handleChange={handleChange}
      errors={errors}
      touched={touched}
    />
  ));
};

export default FormFields;
