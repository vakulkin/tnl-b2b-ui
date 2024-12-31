import { useState, useEffect, useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import debounce from "lodash/debounce";
import {
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { getEntityStore } from "../../store";
import {
  useFetchEntityById,
  useFetchEntityList,
  useCreateEntityMutation,
  useUpdateEntityMutation,
  useFetchInfoByKey,
  useFetchDepsByKey,
} from "../../useManagement";
import FormFields from "./FormFields";
import SingleLoader from "../general/SingleLoader";
import EntityAttachForm from "./EntityAttachForm";
import LogicBlockCard from "../cards/LogicBlockCard";
import { convertToYupSchema } from "../../helpers";

const EntityForm = ({ entityKey }) => {
  const useStore = getEntityStore(entityKey);
  const { formMode, selectedEntityId, handleFormDialogClose } = useStore();

  const isCreateMode = formMode === "add";

  const {
    data: entityData,
    isLoading: entityIsLoading,
    isFetched: entityIsFetched,
  } = useFetchEntityById(entityKey, "joined", selectedEntityId);

  // Initialize formValues with initialValues or entityData
  const initialFormValues = entityData || {};
  const [formValues, setFormValues] = useState(initialFormValues);

  // Memoize the debounced function
  // const debouncedHandleChange = useMemo(() => {
  //   const handler = debounce((values) => {
  //     setFormValues(values);
  //   }, 500);

  //   return handler;
  // }, []);

  // Pass updated formValues to useFetchEntityList
  const { data: formData, isLoading: formIsLoading } = useFetchEntityList(
    entityKey,
    "form",
    { ...entityData, ...formValues },
    (entityIsFetched && !isCreateMode) || isCreateMode
  );

  const { data: infoData, isLoading: infoIsLoading } =
    useFetchInfoByKey(entityKey);
  const { data: depsData, isLoading: depsIsLoading } =
    useFetchDepsByKey(entityKey);

  const createMutation = useCreateEntityMutation(entityKey, [
    [entityKey, "simple"],
    [entityKey, "joined"],
  ]);
  const updateMutation = useUpdateEntityMutation(entityKey, [
    [entityKey, "simple"],
    [entityKey, "joined"],
  ]);

  if (formIsLoading || entityIsLoading || infoIsLoading || depsIsLoading)
    return <SingleLoader icon={entityKey} size={34} />;

  const fieldsList = formData || [];
  const initialValues = fieldsList.reduce((acc, field) => {
    acc[field.name] = isCreateMode
      ? field.type === "select"
        ? field.options[0].key
        : ""
      : entityData?.[field.name] || "";
    return acc;
  }, {});

  const validationSchema = convertToYupSchema(fieldsList);

  const handleSubmit = (values) => {
    if (isCreateMode) {
      createMutation.mutate({
        ...values,
      });
    } else {
      updateMutation.mutate({ id: selectedEntityId, ...values });
    }
  };

  const disabled = createMutation.isPending || updateMutation.isPending;

  // // FormObserver component to update formValues state
  // const FormObserver = () => {
  //   const { values } = useFormikContext();

  //   useEffect(() => {
  //     // Debounced update of formValues and customAction
  //     debouncedHandleChange(values);
  //   }, [values]);

  //   // Cleanup function to cancel debounced calls if the component unmounts
  //   useEffect(() => {
  //     return () => {
  //       debouncedHandleChange.cancel();
  //     };
  //   }, []);

  //   return null;
  // };

  return (
    <>
      <DialogTitle>
        {isCreateMode ? "Add" : "Edit"} {infoData?.whom.toLowerCase()}
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            {/* <FormObserver /> */}
            <DialogContent>
              <FormFields
                entityKey={entityKey}
                fieldsList={fieldsList}
                values={values}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
                disabled={disabled}
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 5 }}>
              <Button onClick={handleFormDialogClose}>Close</Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={disabled}
              >
                {isCreateMode ? "Add" : "Update"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
      {!isCreateMode && depsData && 
        (entityKey === "logic_blocks" ? (
          <LogicBlockCard depsData={depsData} />
        ) : (
          Object.entries(depsData).map(([key, dependent]) => (
            <Box key={key} sx={{ p: 3 }}>
              <EntityAttachForm
                entityKey={entityKey}
                depsKey={key}
                depsData={dependent}
              />
            </Box>
          ))
        ))}
    </>
  );
};

export default EntityForm;
