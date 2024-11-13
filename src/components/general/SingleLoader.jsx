import EntityIcon from "./EntityIcon";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

const SingleLoader = ({ icon, size }) => (
  <Box
    sx={{
      py: 10,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <motion.div
      animate={{
        y: [0, -size / 5, 0],
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <EntityIcon icon={icon} size={size} />
    </motion.div>
  </Box>
);

export default SingleLoader;
