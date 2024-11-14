import { createFileRoute } from '@tanstack/react-router';
import EntityTable from '../../components/table/EntitiyTable';

const Groups = () => {
  const entityKey = 'groups';

  const columnsConfig = [
    { field: 'id', headerName: 'ID', flex: 100 },
    { field: 'name', headerName: 'Name', flex: 300 },
    {
      field: 'products',
      headerName: 'Products',
      flex: 700,
      type: 'limitedChips',
      sortable: false
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

export default Groups;

export const Route = createFileRoute('/groups/')({
  component: () => <Groups />,
});
