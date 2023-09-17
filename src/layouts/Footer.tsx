import { Box, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  console.log(mode);

  return (
    <Box
      component="footer"
      height="30px"
      position="fixed"
      color={theme.palette.common.white}
      bottom={0}
      width="100%"
      sx={{
        backgroundColor:
          mode === "dark"
            ? theme.palette.background.paper
            : theme.palette.primary.main,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="body2">© Created by Dang Le 2023</Typography>
    </Box>
  );
}
