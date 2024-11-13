import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import EntityAttachForm from "../modal/EntityAttachForm";

const LogicBlockCard = ({ depsData }) => {
  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        background: "#ffffff",
        borderRadius: 3,
      }}
    >
      <EntityAttachForm
        entityKey="logic_blocks"
        depsKey="rules"
        depsData={depsData["rules"]}
      />

      <Box sx={{ mt: 5, p: 4, background: "#F4F5F4", borderRadius: 2 }}>
        <Box sx={{ mt: 3, p: 4, background: "#EAECEA", borderRadius: 2 }}>
          <EntityAttachForm
            entityKey="logic_blocks"
            depsKey="roles"
            depsData={depsData["roles"]}
          />
        </Box>
        <Box sx={{ my: 2, textAlign: "center" }}>oraz</Box>
        <Box sx={{ mt: 3, p: 4, background: "#EAECEA", borderRadius: 2 }}>
          <Grid container spacing={3} columns={25}>
            <Grid size={{ xs: 25, xl: 8 }}>
              <EntityAttachForm
                entityKey="logic_blocks"
                depsKey="products"
                depsData={depsData["products"]}
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
                <EntityAttachForm
                  entityKey="logic_blocks"
                  depsKey="terms"
                  depsData={depsData["terms"]}
                />
                <Box sx={{ my: 2, textAlign: "center" }}>oraz</Box>
                <EntityAttachForm
                  entityKey="logic_blocks"
                  depsKey="groups"
                  depsData={depsData["groups"]}
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
  depsData: PropTypes.object.isRequired,
};

export default LogicBlockCard;
