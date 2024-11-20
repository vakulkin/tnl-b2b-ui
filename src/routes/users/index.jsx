import { createFileRoute } from "@tanstack/react-router";
import EntityTable from "../../components/table/EntitiyTable";
import { useFetchGeneralInfo } from "../../useManagement";
import SingleLoader from "../../components/general/SingleLoader";

const Users = () => {
  const entityKey = "users";

  const { data: infoData, isLoading: infoIsLoading } =
    useFetchGeneralInfo(entityKey);

  if (infoIsLoading) {
    return <SingleLoader icon={entityKey} size={34} />;
  }

  const columnsConfig = [
    { field: "id", headerName: "ID", flex: 100 },
    { field: "name", headerName: "Email użytkownika", flex: 300 },
    {
      field: "roles",
      headerName: "Role",
      flex: 700,
      type: "limitedChips",
      sortable: false,
      description: infoData.roles.description,
    },
  ];

  return <EntityTable entityKey={entityKey} columnsConfig={columnsConfig} />;
};

export default Users;

export const Route = createFileRoute("/users/")({
  component: () => <Users />,
});
