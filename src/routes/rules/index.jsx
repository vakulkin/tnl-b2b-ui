import { createFileRoute } from '@tanstack/react-router';
import EntityTable from '../../components/table/EntitiyTable';

const formatKindValue = (kind, value) => {
  value = value || 0;
  switch (kind) {
    case 'equals':
      return `= ${value} .-`;
    case 'minus_percent':
      return `- ${value}%`;
    case 'plus_percent':
      return `+ ${value}%`;
    case 'minus_number':
      return `- ${value} .-`;
    case 'plus_number':
      return `+ ${value} .-`;
    case 'request_quote':
      return 'Cena na telefon';
    default:
      return '';
  }
};

const Rules = () => {
  const entityKey = 'rules';

  const columnsConfig = [
    { field: 'id', headerName: 'ID', flex: 50 },
    { field: 'name', headerName: 'Name', flex: 200 },
    { field: 'priority', headerName: 'Priority', flex: 70 },
    { field: 'active', headerName: 'Active', flex: 70 },
    {
      field: 'kind',
      headerName: 'Kind',
      flex: 120,
      valueGetter: (params, row) =>
        formatKindValue(params, row.value),
      sortable: false
    },
    {
      field: 'operation',
      headerName: 'Operation',
      flex: 120,
      valueGetter: (params, row) =>
        formatKindValue(params, row.operation_value),
      sortable: false
    },
    { field: 'min_qty', headerName: 'Min Qty', flex: 80 },
    { field: 'max_qty', headerName: 'Max Qty', flex: 80 },
    { field: 'show_table', headerName: 'Show Table', flex: 100, sortable: false },
    {
      field: 'logic_blocks',
      headerName: 'Logic Blocks',
      flex: 600,
      type: 'limitedChips',
      sortable: false
    },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 70,
      type: 'action',
      action: 'edit',
      sortable: false
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 70,
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

Rules.propTypes = {};

export default Rules;

export const Route = createFileRoute('/rules/')({
  component: () => <Rules />,
});
