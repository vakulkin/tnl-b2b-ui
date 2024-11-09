import { useState } from "react";
import { Box, Pagination } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useFetchEntityList } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import EditModal from "../../components/general/Modal/EditModal";
import SingleCard from "../../components/cards/SingleCard";
import SingleLoader from "../../components/general/SingleLoader";

const Groups = () => {
  const [page, setPage] = useState(1);
  const entityKey = "groups";

  const { data: rolesData, isLoading: rolesIsLoading } = useFetchEntityList(
    entityKey,
    "joined",
    {
      page,
    }
  );

  if (rolesIsLoading) return <SingleLoader icon={entityKey} size={32} />;

  const pageCount = Math.ceil(rolesData.total / rolesData.per_page);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box sx={{ p: 4 }}>
        <PageHeader entityKey={entityKey} />
        {rolesData.items?.map((role) => (
          <SingleCard
            key={role.id}
            entityKey={entityKey}
            entity={role}
            attachmentKey="products"
          />
        ))}
        <EditModal entityKey={entityKey} />
      </Box>
      {pageCount > 1 && (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            disabled={rolesIsLoading}
            count={pageCount}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </>
  );
};

export default Groups;

// Export the Route for routing purposes
export const Route = createFileRoute("/groups/")({
  component: () => <Groups />,
});
