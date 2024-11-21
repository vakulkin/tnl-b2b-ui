import { useFetchInfoByKey } from "../../useManagement";
import InfoTooltip from "../general/InfoTooltip";

const ColumnHeader = ({ params }) => {
  const { data, isLoading, isError } = useFetchInfoByKey(params.field);

  if (isLoading) return <>is loading</>;
  if (isError) return <div>Error loading data.</div>;

  if (data) {
    return <InfoTooltip text={data.description}>{params.colDef.headerName}</InfoTooltip>;
  }

  return <>{params.colDef.headerName}</>
};

export default ColumnHeader;
