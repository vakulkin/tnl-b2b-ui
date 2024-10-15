import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Pagination } from "@mui/material";
import { useManagement } from "../../useManagement";
import PageHeader from "../../components/general/PageHeader";
import EditModal from "../../components/general/Modal/EditModal";
import SingleCard from "../../components/cards/SingleCard";

const Roles = () => {
  const entityKey = "roles";
  const [page, setPage] = useState(1);

  const { useEntitiesQuery } = useManagement(entityKey);
  const { data: rolesData, isLoading: rolesIsLoading } =
    useEntitiesQuery("joined",  {
      page
    });

  if (rolesIsLoading) return <>isLoading</>;

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
            attachmentKey="users"
          />
        ))}
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
        <EditModal entityKey={entityKey} />
      </Box>
    </>
  );
};

export default Roles;

// Export the Route for routing purposes
export const Route = createFileRoute("/roles/")({
  component: () => <Roles />,
});
