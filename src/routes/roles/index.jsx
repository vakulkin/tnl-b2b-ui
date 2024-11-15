import { createFileRoute } from '@tanstack/react-router';
import EntityTable from '../../components/table/EntitiyTable';
import { useFetchGeneralInfo } from '../../useManagement';
import SingleLoader from '../../components/general/SingleLoader';

const Roles = () => {
  const entityKey = 'roles';

  const { data: infoData, isLoading: infoIsLoading } =
  useFetchGeneralInfo(entityKey);

if (infoIsLoading) {
  return <SingleLoader icon={entityKey} size={34} />;
}

  const columnsConfig = [
    { field: 'id', headerName: 'ID', flex: 100 },
    { field: 'name', headerName: 'Name', flex: 300 },
    {
      field: 'users',
      headerName: 'Users',
      flex: 700,
      type: 'limitedChips',
      sortable: false,
      description: infoData.users.description,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 100,
      type: 'action',
      action: 'edit',
      sortable: false
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 100,
      type: 'action',
      action: 'delete',
      sortable: false
    },
  ];

  return (
    <EntityTable
      entityKey={entityKey}
      columnsConfig={columnsConfig}
    />
  );
};


export default Roles;

export const Route = createFileRoute('/roles/')({
  component: () => <Roles />,
});
