import { createFileRoute } from '@tanstack/react-router';
import EntityTable from '../../components/table/EntitiyTable';

const Groups = () => {
  const entityKey = 'groups';

  const columnsConfig = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 300 },
    {
      field: 'products',
      headerName: 'Products',
      width: 700,
      type: 'limitedChips',
      sortable: false
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      type: 'action',
      action: 'edit',
      sortable: false
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
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
