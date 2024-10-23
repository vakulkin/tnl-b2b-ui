import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import {
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { getEntityStore } from "../../../store";
import { useManagement } from "../../../useManagement";
import * as Yup from "yup";
import FormFields from "./FormFields";
import SingleLoader from "../SingleLoader";

const EntityForm = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { formMode, selectedEntityId, handleFormDialogClose } = useStore();

  const { useEntityQuery, useEntitiesQuery, createMutation, updateMutation } =
    useManagement(entityKey);

  const { data: formData, isLoading: formIsLoading } = useEntitiesQuery("form");

  const { data: entityData, isLoading: entityIsLoading } = useEntityQuery(
    selectedEntityId,
    "joined"
  );

  const { data: infoData, isFetching: infoIsLoading } =
    useEntitiesQuery("info");

  if (formIsLoading || entityIsLoading || infoIsLoading) return <SingleLoader icon={entityKey} size={34} />;

  const fieldsList = formData || [];
  const isCreateMode = formMode === "add";
  const initialValues = fieldsList.reduce((acc, field) => {
    if (field.type === "select" && field.options && field.options.length > 0) {
      acc[field.name] = isCreateMode
        ? field.options[0]
        : (entityData?.[field.name] ?? "");
    } else {
      acc[field.name] = isCreateMode
        ? ""
        : (entityData?.[field.name] ?? "");
    }
    return acc;
  }, {});

  // Convert validations to Yup schema
  const validationSchema = convertToYupSchema(fieldsList);

  return (
    <>
      <DialogTitle>
        {isCreateMode ? "Dodaj" : "Edytuj"} {infoData?.whom.toLowerCase()}
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <DialogContent>
              <FormFields
                fieldsList={fieldsList}
                values={values}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFormDialogClose}>Zamknij</Button>
              <Button type="submit" variant="contained" color="primary">
                {isCreateMode ? "Dodaj" : "Aktualizuj"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </>
  );

  function handleSubmit(values) {
    if (isCreateMode) {
      createMutation.mutate({
        attachmentKey: infoData.dependent_key,
        ...values,
      });
    } else {
      updateMutation.mutate({ id: selectedEntityId, ...values });
    }
  }

  function convertToYupSchema(fields) {
    const shape = {};

    fields.forEach((field) => {
      const validations = field.validation || [];
      let validator = null;

      // Iterate over all the validations and chain them together
      validations.forEach((validation) => {
        const { rule, params } = validation;
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

      // If no validations are defined, provide default validator based on field type
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
  }
};

EntityForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EntityForm;
