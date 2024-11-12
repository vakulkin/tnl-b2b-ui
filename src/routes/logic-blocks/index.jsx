import { createFileRoute } from "@tanstack/react-router";
import { Box, Typography } from "@mui/material";
import EntityTable from "../../components/general/EntitiyTable";
import LimitedChips from "../../components/LimitedChips";

const LogicBlocks = () => {
  const entityKey = "logic_blocks";

  const renderLogicCell = (params) => {
    const row = params.row;

    const roles = row.roles ? JSON.parse(row.roles) : [];
    const products = row.products ? JSON.parse(row.products) : [];
    const groups = row.groups ? JSON.parse(row.groups) : [];
    const terms = row.terms ? JSON.parse(row.terms) : [];

    // Generate the logic expression with appropriate operators
    const logicComponents = [];

    if (roles.length > 0) {
      logicComponents.push({
        text: null,
        field: "roles",
        prefix: "każda ",
      });
    }

    if (products.length > 0 || groups.length > 0 || terms.length > 0) {

      if (roles.length > 0) {
        logicComponents.push({ text: "and", field: null });
      }

      if (roles.length > 0 && groups.length > 0 && terms.length > 0) {
        logicComponents.push({ text: "(", field: null });
      }

      // Add product conditions
      if (products.length > 0) {
        logicComponents.push({
          text: null,
          field: "products",
          prefix: "jeden z ",
        });
      }

      // Add group conditions with 'and' operator if products or terms exist
      if (groups.length > 0) {
        if (products.length > 0) {
          logicComponents.push({ text: "or", field: null });
        }
        logicComponents.push({
          text: null,
          field: "groups",
          prefix: "każda ",
        });
      }

      // Add term conditions with 'or' operator if products also exist
      if (terms.length > 0) {
        if (products.length > 0 || groups.length > 0) {
          logicComponents.push({ text: "and", field: null });
        }
        logicComponents.push({
          text: null,
          field: "terms",
          prefix: "każdy ",
        });
      }

      if (roles.length > 0 && groups.length > 0 && terms.length > 0) {
        logicComponents.push({ text: ")", field: null });
      }
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 1,
          rowGap: 0.5,
          alignItems: "center",
        }}
      >
        {roles.length === 0 &&
        products.length === 0 &&
        terms.length === 0 &&
        groups.length === 0 ? (
          <>
            <LimitedChips
              items={[]}
              entityKey={entityKey}
              entity={row}
              attachmentKey={"roles"}
            />
            <LimitedChips
              items={[]}
              entityKey={entityKey}
              entity={row}
              attachmentKey={"products"}
            />
            <LimitedChips
              items={[]}
              entityKey={entityKey}
              entity={row}
              attachmentKey={"terms"}
            />
            <LimitedChips
              items={[]}
              entityKey={entityKey}
              entity={row}
              attachmentKey={"groups"}
            />
          </>
        ) : (
          logicComponents.map((component, index) => {
            if (component.text) {
              return (
                <Typography
                  key={index}
                  sx={{
                    margin: 0,
                    fontSize: ".8rem",
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
                  postfix={component.postfix || ""}
                  maxVisibleItems={0}
                />
              );
            }
            return null;
          })
        )}
      </Box>
    );
  };

  const columnsConfig = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 300 },
    {
      field: "rules",
      headerName: "Rules",
      width: 250,
      type: "limitedChips",
      sortable: false,
    },
    {
      field: "logic",
      headerName: "Logic",
      flex: 1,
      renderCell: renderLogicCell,
      sortable: false,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      type: "action",
      action: "edit",
      sortable: false,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      type: "action",
      action: "delete",
      sortable: false,
    },
  ];

  const additionalModals = [
    "logic_blocks",
    "rules",
    "roles",
    "terms",
    "groups",
  ];

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

export const Route = createFileRoute("/logic-blocks/")({
  component: () => <LogicBlocks />,
});
