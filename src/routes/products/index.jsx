import { createFileRoute } from "@tanstack/react-router";
import EntityTable from "../../components/table/EntitiyTable";
import { useFetchGeneralInfo } from "../../useManagement";
import SingleLoader from "../../components/general/SingleLoader";

const Products = () => {
  const entityKey = "products";

  const { data: infoData, isLoading: infoIsLoading } =
    useFetchGeneralInfo(entityKey);

  if (infoIsLoading) {
    return <SingleLoader icon={entityKey} size={34} />;
  }

  const columnsConfig = [
    { field: "id", headerName: "ID", flex: 100 },
    { field: "name", headerName: "Nazwa", flex: 500 },
    { field: "sku", headerName: "sku", flex: 200 },
    { field: "price", headerName: "price", flex: 200 },
    { field: "stock_status", headerName: "stock_status", flex: 200 },
    { field: "stock_quantity", headerName: "stock_quantity", flex: 200 },
    {
      field: "groups",
      headerName: "Grupy",
      flex: 600,
      type: "limitedChips",
      sortable: false,
      description: infoData.roles.description,
    },
    {
      field: "logic_blocks",
      headerName: "Warunki",
      flex: 600,
      type: "limitedChips",
      sortable: false,
      description: infoData.logic_blocks.description,
    },
  ];

  return <EntityTable entityKey={entityKey} columnsConfig={columnsConfig} />;
};

export default Products;

export const Route = createFileRoute("/products/")({
  component: () => <Products />,
});
