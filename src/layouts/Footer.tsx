import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      component="footer"
      height="30px"
      position="fixed"
      color="white"
      bottom={0}
      width="100%"
      sx={{
        backgroundColor: "black",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="body2">Created by Dang Le 2023</Typography>
    </Box>
  );
}
