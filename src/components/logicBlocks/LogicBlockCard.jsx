import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
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
      <Box>
        <CardAttacments
          entityKey="logic_blocks"
          entity={logicBlock}
          attachmentKey="rules"
        />
      </Box>

      <Box sx={{ mt: 5, p: 4, background: "#F4F5F4", borderRadius: 2 }}>
        <Box sx={{ mt: 3, p: 4, background: "#EAECEA", borderRadius: 2 }}>
          <CardAttacments
            entityKey="logic_blocks"
            entity={logicBlock}
            attachmentKey="roles"
            separator="i"
          />
        </Box>
        <Box sx={{ my: 2, textAlign: "center" }}>oraz</Box>
        <Box sx={{ mt: 3, p: 4, background: "#EAECEA", borderRadius: 2 }}>
          <Grid container spacing={3} columns={25}>
            <Grid size={{ xs: 25, xl: 8 }}>
              <CardAttacments
                entityKey="logic_blocks"
                entity={logicBlock}
                attachmentKey="products"
                separator="lub"
              />
            </Grid>
            <Grid size={{ xs: 25, xl: 1 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                lub
              </Box>
            </Grid>
            <Grid size={{ xs: 25, xl: 16 }}>
              <Box>
                <CardAttacments
                  entityKey="logic_blocks"
                  entity={logicBlock}
                  attachmentKey="terms"
                  separator="i"
                />
                <Box sx={{ my: 2, textAlign: "center" }}>oraz</Box>
                <CardAttacments
                  entityKey="logic_blocks"
                  entity={logicBlock}
                  attachmentKey="groups"
                  separator="i"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
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
