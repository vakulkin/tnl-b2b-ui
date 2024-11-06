import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import { useState } from "react";
import CardHeader from "../cards/CardHeader";
import CardAttacments from "../cards/CardAttacments";

const LogicBlockCard = ({ logicBlock }) => {
  const groupsCount = logicBlock["groups"]
    ? JSON.parse(logicBlock["groups"]).length
    : 0;
  const termsCount = logicBlock["terms"]
    ? JSON.parse(logicBlock["terms"]).length
    : 0;
  const groupsTermsCount = groupsCount + termsCount;

  const productsCount = logicBlock["products"]
    ? JSON.parse(logicBlock["products"]).length
    : 0;
  const defaultTab =
    groupsTermsCount > 0 || productsCount === 0 ? "groupsTerms" : "products";


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

      <Box>
        <CardAttacments
          entityKey="logic_blocks"
          entity={logicBlock}
          attachmentKey="rules"
        />
      </Box>

      <Box sx={{ mt: 5, p: 4, background: "#F4F5F4", borderRadius: 2 }}>
        <Box sx={{ mt: 3, p: 4, background: "#EAECEA", borderRadius: 2 }}>
          {/* <Grid container spacing={3} columns={25}> */}
            {/* <Grid size={{ xs: 25, xl: 14 }}>
              <CardAttacments
                entityKey="logic_blocks"
                entity={logicBlock}
                attachmentKey="users"
                separator="i"
              />
            </Grid> */}
            {/* <Grid size={{ xs: 25, xl: 1 }}> */}
              {/* <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                lub
              </Box> */}
            {/* </Grid> */}
            {/* <Grid size={{ xs: 25, xl: 10 }}> */}
              <CardAttacments
                entityKey="logic_blocks"
                entity={logicBlock}
                attachmentKey="roles"
                separator="i"
              />
            {/* </Grid> */}
          {/* </Grid> */}
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
              <Box sx={{ p: 4, border: "3px solid #D4D8D4" }}>
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
