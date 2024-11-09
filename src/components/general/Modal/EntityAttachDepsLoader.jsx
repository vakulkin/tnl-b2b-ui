import PropTypes from "prop-types";
import EntityAttachForm from "./EntityAttachForm";
import { fetchDepsByKey } from "../../../useManagement";
import SingleLoader from "../SingleLoader";

const EntityAttachDepsLoader = ({ entityKey }) => {

  const {
    data: depsData,
    isLoading: depsIsLoading,
    error: depsError,
  } = fetchDepsByKey(entityKey);

  if (depsIsLoading) return <SingleLoader icon={entityKey} size={34} />;
  if (depsError) return "Error loading data.";

  return (
    <EntityAttachForm entityKey={entityKey} depsData={depsData} />
  );
};

EntityAttachDepsLoader.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EntityAttachDepsLoader;
