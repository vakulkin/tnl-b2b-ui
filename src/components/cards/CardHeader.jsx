import { Box, Stack, Chip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CardButtons from "./CardButtons";
import EntityIcon from "../general/EntityIcon";

const CardHeader = ({ children, entityKey, entity }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <EntityIcon icon={entityKey} size={26} />
        <Typography variant="h2">{entity.name}</Typography>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          <Chip label={`id: ${entity.id}`} sx={{ borderRadius: 2 }} />
          {children}
        </Stack>
      </Box>
      <CardButtons entityKey={entityKey} entity={entity} />
    </Box>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node,
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default CardHeader;
