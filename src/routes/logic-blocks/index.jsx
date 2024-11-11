import { createFileRoute } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';
import EntityTable from '../../components/general/EntitiyTable';
import LimitedChips from '../../components/LimitedChips';

const LogicBlocks = () => {
  const entityKey = 'logic_blocks';

  const renderLogicCell = (params) => {
    const row = params.row;

    const logicComponents = [
      {
        text: null,
        field: 'roles',
        prefix: 'User has all roles: ',
        postfix: '',
      },
      { text: 'and', field: null },
      { text: '[', field: null },
      {
        text: null,
        field: 'products',
        prefix: 'Product is one of: ',
        postfix: '',
      },
      { text: 'or', field: null },
      { text: '(', field: null },
      {
        text: null,
        field: 'terms',
        prefix: 'Product has terms: ',
        postfix: '',
      },
      { text: 'and', field: null },
      {
        text: null,
        field: 'groups',
        prefix: 'Product has groups: ',
        postfix: '',
      },
      { text: ')', field: null },
      { text: ']', field: null },
    ];

    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: 1,
          rowGap: 0.5,
          alignItems: 'center',
        }}
      >
        {logicComponents.map((component, index) => {
          if (component.text) {
            return (
              <Typography
                key={index}
                sx={{
                  margin: 0,
                  fontSize: '1.1rem',
                  lineHeight: 1,
                }}
              >
                {component.text}
              </Typography>
            );
          } else if (component.field) {
            const items = row[component.field]
              ? JSON.parse(row[component.field])
              : [];
            return (
              <LimitedChips
                key={index}
                items={items}
                entityKey={entityKey}
                entity={row}
                attachmentKey={component.field}
                prefix={component.prefix}
                postfix={component.postfix}
                maxVisibleItems={0}
              />
            );
          }
          return null;
        })}
      </Box>
    );
  };

  const columnsConfig = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 300 },
    {
      field: 'rules',
      headerName: 'Rules',
      width: 250,
      type: 'limitedChips',
      maxVisibleItems: 0,
      prefix: 'Rules: ',
    },
    {
      field: 'logic',
      headerName: 'Logic',
      flex: 1,
      renderCell: renderLogicCell,
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

  const additionalModals = ['logic_blocks', 'rules', 'roles', 'terms', 'groups'];

  return (
    <EntityTable
      entityKey={entityKey}
      columnsConfig={columnsConfig}
      additionalModals={additionalModals}
    />
  );
};

LogicBlocks.propTypes = {};

export default LogicBlocks;

export const Route = createFileRoute('/logic-blocks/')({
  component: () => <LogicBlocks />,
});
