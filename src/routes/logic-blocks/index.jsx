import { createFileRoute } from "@tanstack/react-router";
import { Box, Typography } from "@mui/material";
import EntityTable from "../../components/table/EntitiyTable";
import LimitedChips from "../../components/chips/LimitedChips";
import { useFetchGeneralInfo } from "../../useManagement";
import SingleLoader from "../../components/general/SingleLoader";

const LogicBlocks = () => {
  const entityKey = "logic_blocks";

  const { data: infoData, isLoading: infoIsLoading } =
    useFetchGeneralInfo(entityKey);

  if (infoIsLoading) {
    return <SingleLoader icon={entityKey} size={34} />;
  }

  const renderLogicCell = (params) => {
    const row = params.row;

    const logicComponents = [];
    logicComponents.push({
      text: null,
      field: "roles",
      prefix: "każda ",
    });
    logicComponents.push({ text: "and", field: null });
    logicComponents.push({ text: "(", field: null });
    logicComponents.push({
      text: null,
      field: "products",
      prefix: "którykolwiek ",
    });

    logicComponents.push({ text: "or", field: null });
    logicComponents.push({
      text: null,
      field: "groups",
      prefix: "każda ",
    });

    logicComponents.push({ text: "and", field: null });
    logicComponents.push({
      text: null,
      field: "terms",
      prefix: "każdy ",
    });
    logicComponents.push({ text: ")", field: null });

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
        {logicComponents.map((component, index) => {
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
                maxVisibleItems={1}
                emptyIcon={true}
                totalSymbols={20}
              />
            );
          }
          return null;
        })}
      </Box>
    );
  };

  const columnsConfig = [
    { field: "id", headerName: "ID", flex: 100 },
    { field: "name", headerName: "Nazwa", flex: 200 },
    { field: "active", headerName: "Aktywny", flex: 70 },
    {
      field: "rules",
      headerName: "Reguły",
      flex: 250,
      type: "limitedChips",
      sortable: false,
      description: infoData.rules.description,
    },
    {
      field: "logic",
      headerName: "Logika",
      flex: 500,
      renderCell: renderLogicCell,
      sortable: false,
    },
    {
      field: "edit",
      headerName: "Edytuj",
      flex: 100,
      type: "action",
      action: "edit",
      sortable: false,
    },
    {
      field: "delete",
      headerName: "Usuń",
      flex: 100,
      type: "action",
      action: "delete",
      sortable: false,
    },
  ];

  return <EntityTable entityKey={entityKey} columnsConfig={columnsConfig} />;
};

export default LogicBlocks;

export const Route = createFileRoute("/logic-blocks/")({
  component: () => <LogicBlocks />,
});
