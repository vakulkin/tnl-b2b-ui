import { Box } from "@mui/material";
import PropTypes from "prop-types";
import CardHeader from "./CardHeader";
import CardAttacments from "./CardAttacments";

const SingleCard = ({
  children,
  entityKey,
  entity,
  attachmentKey,
  separator = "",
  inactive = false,
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        background: "#ffffff",
        borderRadius: 3,
        boxShadow: "rgba(0, 0, 0, 0.04) 0px 2px 4px",
        filter: inactive ? "grayscale(10%) brightness(90%)" : "none",
      }}
    >
      <CardHeader entityKey={entityKey} entity={entity}>
        {children}
      </CardHeader>
      <CardAttacments
        entityKey={entityKey}
        entity={entity}
        attachmentKey={attachmentKey}
        separator={separator}
      />
    </Box>
  );
};

SingleCard.propTypes = {
  children: PropTypes.node,
  entityKey: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  attachmentKey: PropTypes.string.isRequired,
  separator: PropTypes.string,
  inactive: PropTypes.bool,
};

export default SingleCard;
