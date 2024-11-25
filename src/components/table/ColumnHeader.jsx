import { useFetchInfoByKey, useFetchColumnByKey } from "../../useManagement";
import InfoTooltip from "../general/InfoTooltip";

const ColumnHeader = ({ entityKey, params }) => {
  const {
    data: infoData,
    isLoading: infoIsLoading,
    isError: infoIsError,
  } = useFetchInfoByKey(params.field);

  const {
    data: columnData,
    isLoading: columnIsLoading,
    isError: columnIsError,
  } = useFetchColumnByKey(entityKey);

  if (infoIsLoading || columnIsLoading) return <>is loading</>;
  if (infoIsError || columnIsError) return <div>Error loading data.</div>;

  const columnName =
    columnData?.[params.field]?.name ?? params.colDef.headerName;

  if (infoData) {
    return <InfoTooltip text={infoData.description}>{columnName}</InfoTooltip>;
  }

  return <>{columnName}</>;
};

export default ColumnHeader;
