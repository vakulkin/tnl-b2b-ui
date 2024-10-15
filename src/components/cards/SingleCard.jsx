import { Box } from "@mui/material";
import PropTypes from "prop-types";
import CardHeader from "../general/CardHeader";
import CardAttacments from "./CardAttacments";

const SingleCard = ({
  children,
  entityKey,
  entity,
  attachmentKey,
  separator = "",
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        background: "linear-gradient(135deg, #a9d6e5, #78c2cf)",
        borderRadius: 7,
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
  separator: PropTypes.string.isRequired,
};

export default SingleCard;
