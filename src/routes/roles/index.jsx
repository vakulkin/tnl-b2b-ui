import { createFileRoute } from '@tanstack/react-router';
import EntityTable from '../../components/general/EntitiyTable';

const Roles = () => {
  const entityKey = 'roles';

  const columnsConfig = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 300 },
    {
      field: 'users',
      headerName: 'Users',
      width: 700,
      type: 'limitedChips',
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      type: 'action',
      action: 'edit',
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      type: 'action',
      action: 'delete',
    },
  ];

  return (
    <EntityTable
      entityKey={entityKey}
      columnsConfig={columnsConfig}
      additionalModals={['users']}
    />
  );
};

Roles.propTypes = {};

export default Roles;

export const Route = createFileRoute('/roles/')({
  component: () => <Roles />,
});
