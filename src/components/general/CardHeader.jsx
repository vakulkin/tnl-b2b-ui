import { Box, Stack, Chip } from "@mui/material";
import PropTypes from "prop-types";
import CardActions from "./CardActions";

const CardHeader = ({ children, entityKey, entity }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
      <Chip label={entity.name} />
      <Chip label={`id: ${entity.id}`} />
      {children}
    </Stack>
      <CardActions entityKey={entityKey} entity={entity} />
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
