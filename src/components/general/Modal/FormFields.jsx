import PropTypes from "prop-types";
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

FormFields.propTypes = {
  fieldsList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      validation: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
};

export default FormFields;
