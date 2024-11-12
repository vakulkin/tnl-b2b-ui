import { createFileRoute } from '@tanstack/react-router';
import EntityTable from '../../components/general/EntitiyTable';

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
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'priority', headerName: 'Priority', width: 100 },
    {
      field: 'kind',
      headerName: 'Kind',
      width: 150,
      valueGetter: (params, row) =>
        formatKindValue(params, row.value),
      sortable: false
    },
    {
      field: 'operation',
      headerName: 'Operation',
      width: 150,
      valueGetter: (params, row) =>
        formatKindValue(params, row.operation_value),
      sortable: false
    },
    { field: 'min_qty', headerName: 'Min Qty', width: 100 },
    { field: 'max_qty', headerName: 'Max Qty', width: 100 },
    { field: 'show_table', headerName: 'Show Table', width: 100, sortable: false },
    {
      field: 'logic_blocks',
      headerName: 'Logic Blocks',
      width: 400,
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

Rules.propTypes = {};

export default Rules;

export const Route = createFileRoute('/rules/')({
  component: () => <Rules />,
});
