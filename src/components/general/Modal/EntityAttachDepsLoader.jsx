import PropTypes from "prop-types";
import EntityAttachForm from "./EntityAttachForm";
import { useManagement } from "../../../useManagement";

const EntityAttachDepsLoader = ({ entityKey }) => {
  
  const { useEntitiesQuery } = useManagement(entityKey);

  const {
    data: depsData,
    isLoading: depsIsLoading,
    error: depsError,
  } = useEntitiesQuery("deps");

  if (depsIsLoading) return "Loading...";
  if (depsError) return "Error loading data.";

  return (
    <EntityAttachForm entityKey={entityKey} depsData={depsData} />
  );
};

EntityAttachDepsLoader.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EntityAttachDepsLoader;
