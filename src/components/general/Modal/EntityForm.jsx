import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import {
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { getEntityStore } from "../../../store";
import {
  useFetchEntityById,
  useFetchEntityList,
  useCreateEntityMutation,
  useUpdateEntityMutation,
  useFetchInfoByKey,
  useFetchDepsByKey,
} from "../../../useManagement";
import * as Yup from "yup";
import FormFields from "./FormFields";
import SingleLoader from "../SingleLoader";
import EntityAttachForm from "./EntityAttachForm";
import LogicBlockCard from "../../logicBlocks/LogicBlockCard";

const EntityForm = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { formMode, selectedEntityId, handleFormDialogClose } = useStore();

  const isCreateMode = formMode === "add";

  // Fetch form data, entity data, and entity info
  const { data: formData, isLoading: formIsLoading } = useFetchEntityList(
    entityKey,
    "form"
  );
  const { data: entityData, isLoading: entityIsLoading } = useFetchEntityById(
    entityKey,
    selectedEntityId,
    "joined"
  );
  const { data: infoData, isLoading: infoIsLoading } =
    useFetchInfoByKey(entityKey);
  const { data: depsData, isLoading: depsIsLoading } =
    useFetchDepsByKey(entityKey);

  // Mutation hooks for creating and updating
  const createMutation = useCreateEntityMutation(entityKey, [
    [entityKey, "joined"],
  ]);
  const updateMutation = useUpdateEntityMutation(entityKey, [
    [entityKey, "joined"],
  ]);

  if (formIsLoading || entityIsLoading || infoIsLoading || depsIsLoading)
    return <SingleLoader icon={entityKey} size={34} />;

  const fieldsList = formData || [];
  const initialValues = fieldsList.reduce((acc, field) => {
    acc[field.name] = isCreateMode
      ? field.type === "select"
        ? field.options[0]
        : ""
      : entityData?.[field.name] || "";
    return acc;
  }, {});

  const validationSchema = convertToYupSchema(fieldsList);

  function handleSubmit(values) {
    if (isCreateMode) {
      createMutation.mutate({
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
  }

  return (
    <>
      <DialogTitle>
        {isCreateMode ? "Add" : "Edit"} {infoData?.whom.toLowerCase()}
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <fieldset
              disabled={createMutation.isLoading || updateMutation.isLoading}
              style={{ border: "none", padding: 0, margin: 0 }}
            >
              <DialogContent>
                <FormFields
                  fieldsList={fieldsList}
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 5 }}>
                <Button onClick={handleFormDialogClose}>Close</Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    createMutation.isLoading || updateMutation.isLoading
                  }
                >
                  {isCreateMode ? "Add" : "Update"}
                </Button>
              </DialogActions>
            </fieldset>
          </Form>
        )}
      </Formik>
      {!isCreateMode && (
        <>
          {"logic_blocks" === entityKey && (
            <LogicBlockCard logicBlock={entityData} />
          )}
          {Object.entries(depsData).map(([key, dependent]) => (
            <Box key={key} sx={{ p: 3 }}>
              <EntityAttachForm
                entityKey={entityKey}
                depsKey={key}
                depsData={dependent}
              />
            </Box>
          ))}
        </>
      )}
    </>
  );
};

EntityForm.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EntityForm;
