import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Pagination } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import LogicBlockCard from "../../components/logicBlocks/LogicBlockCard";
import EditModal from "../../components/general/Modal/EditModal";
import SingleLoader from "../../components/general/SingleLoader";

const LogicBlocks = () => {
  const entityKey = "logic_blocks";
  const [page, setPage] = useState(1);

  const { useEntitiesQuery } = useManagement(entityKey);
  const { data: logicBlocksData, isLoading: logicBlocksIsLoading } =
    useEntitiesQuery("joined", {
      page,
    });

  if (logicBlocksIsLoading) return <SingleLoader icon={entityKey} size={40} />;

  const pageCount = Math.ceil(logicBlocksData.total / logicBlocksData.per_page);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box sx={{ p: 4 }}>
        <PageHeader entityKey={entityKey} />
        {logicBlocksData.items?.map((logicBlock) => (
          <LogicBlockCard logicBlock={logicBlock} key={logicBlock.id} />
        ))}
        {pageCount > 1 && (
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <Pagination
              disabled={logicBlocksIsLoading}
              count={pageCount}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        )}
        <EditModal entityKey={entityKey} />
        <EditModal entityKey="rules" />
        <EditModal entityKey="roles" />
        <EditModal entityKey="groups" />
        <EditModal entityKey="terms" />
      </Box>
    </>
  );
};

export default LogicBlocks;

export const Route = createFileRoute("/logic-blocks/")({
  component: () => <LogicBlocks />,
});
