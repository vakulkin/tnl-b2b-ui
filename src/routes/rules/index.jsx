import { createFileRoute } from "@tanstack/react-router";
import EntityTable from "../../components/table/EntitiyTable";
import { formatKindValue } from "../../helpers";

const Rules = () => {
  const entityKey = "rules";

  const columnsConfig = [
    { field: "id", headerName: "ID", flex: 50 },
    { field: "name", headerName: "Nazwa", flex: 200 },
    { field: "priority", headerName: "Priorytet", flex: 70 },
    { field: "status", headerName: "Status", flex: 70 },
    {
      field: "product_rule",
      headerName: "Regula produktu",
      flex: 120,
      valueGetter: (params, row) =>
        formatKindValue(params, row.product_rule_value),
      sortable: false,
    },
    {
      field: "cart_product_rule",
      headerName: "Regula w koszyku",
      flex: 120,
      valueGetter: (params, row) =>
        formatKindValue(params, row.cart_product_rule_value),
      sortable: false,
    },
    { field: "min_qty", headerName: "Min. ilość", flex: 80 },
    { field: "max_qty", headerName: "Maks. lość", flex: 80 },
    // {
    //   field: "show_table",
    //   headerName: "Pokaż w tabeli",
    //   flex: 100,
    //   sortable: false,
    // },
    {
      field: "logic_blocks",
      headerName: "Warunki",
      flex: 600,
      type: "limitedChips",
      sortable: false,
    },
    {
      field: "edit",
      headerName: "Edytuj",
      flex: 70,
      type: "action",
      action: "edit",
      sortable: false,
    },
    {
      field: "delete",
      headerName: "Usuń",
      flex: 70,
      type: "action",
      action: "delete",
      sortable: false,
    },
  ];

  return <EntityTable entityKey={entityKey} columnsConfig={columnsConfig} />;
};

export default Rules;

export const Route = createFileRoute("/rules/")({
  component: () => <Rules />,
});
