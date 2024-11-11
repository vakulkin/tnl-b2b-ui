import PropTypes from "prop-types";
import EntityAttachForm from "./EntityAttachForm";
import { useFetchDepsByKey } from "../../../useManagement";
import SingleLoader from "../SingleLoader";
import { getEntityStore } from "../../../store";

const EntityAttachDepsLoader = ({ entityKey }) => {

  const useStore = getEntityStore(entityKey);
  const { attachmentKey } = useStore();


  const {
    data: depsData,
    isLoading: depsIsLoading,
    error: depsError,
  } = useFetchDepsByKey(entityKey);

  if (depsIsLoading) return <SingleLoader icon={entityKey} size={34} />;
  if (depsError) return "Error loading data.";

  return (
    // <>{JSON.stringify([entityKey, attachmentKey, depsData])}</>
    <EntityAttachForm entityKey={entityKey} depsKey={attachmentKey} depsData={depsData[attachmentKey]} />
  );
};

EntityAttachDepsLoader.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

export default EntityAttachDepsLoader;
