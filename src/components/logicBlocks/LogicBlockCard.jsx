import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import CardHeader from "../cards/CardHeader";

import CardAttacments from "../cards/CardAttacments";

const LogicBlockCard = ({ logicBlock }) => {
  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        background: "#ffffff",
        borderRadius: 3,
      }}
    >
      <CardHeader entityKey="logic_blocks" entity={logicBlock} />
      <Grid container spacing={3} alignItems="center">
        <Grid size={{ xs: 12, xl: 4 }}>
          <CardAttacments
            entityKey="logic_blocks"
            entity={logicBlock}
            attachmentKey="roles"
            separator="i"
          />
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <CardAttacments
            entityKey="logic_blocks"
            entity={logicBlock}
            attachmentKey="groups"
            separator="i"
          />
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <CardAttacments
            entityKey="logic_blocks"
            entity={logicBlock}
            attachmentKey="terms"
            separator="i"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

LogicBlockCard.propTypes = {
  logicBlock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.string,
    roles: PropTypes.string,
    products: PropTypes.string,
    groups: PropTypes.string,
    terms: PropTypes.string,
  }).isRequired,
};

export default LogicBlockCard;
