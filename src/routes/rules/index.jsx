import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Pagination } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import EditModal from "../../components/general/Modal/EditModal";
import SingleCard from "../../components/cards/SingleCard";
import RuleDetails from "../../components/rules/RuleDetails";
import SingleLoader from "../../components/general/SingleLoader";

const Rules = () => {
  const entityKey = "rules";
  const [page, setPage] = useState(1);

  const { useEntitiesQuery } = useManagement(entityKey);
  const { data: rulesData, isLoading: rulesIsLoading } = useEntitiesQuery(
    "joined",
    {
      page,
    }
  );

  if (rulesIsLoading) return <SingleLoader icon={entityKey} size={40} />;

  const pageCount = Math.ceil(rulesData.total / rulesData.per_page);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box sx={{ p: 4 }}>
        <PageHeader entityKey={entityKey} />
        {rulesData.items?.map((rule) => (
          <SingleCard
            key={rule.id}
            entityKey={entityKey}
            entity={rule}
            attachmentKey="logic_blocks"
            separator="lub"
            inactive={rule.active !== "1"}
          >
            <RuleDetails rule={rule} />
          </SingleCard>
        ))}
        {pageCount > 1 && (
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <Pagination
              disabled={rulesIsLoading}
              count={pageCount}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        )}
        <EditModal entityKey={entityKey} />
        <EditModal entityKey="logic_blocks" />
      </Box>
    </>
  );
};

export default Rules;

// Export the Route for routing purposes
export const Route = createFileRoute("/rules/")({
  component: () => <Rules />,
});
