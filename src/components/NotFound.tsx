import { Stack, Typography, useTheme } from "@mui/material";
import NoBeerWhite from "../assets/beerQuestionBlackBorder.png";
import NoBeerYellow from "../assets/beerQuestionYellow.png";

export default function NotFound() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  return (
    <Stack alignItems={"center"} justifyContent={"center"} padding={10}>
      <img
        src={mode === "light" ? NoBeerWhite : NoBeerYellow}
        style={{ height: 300 }}
      />
      <Typography
        variant="body1"
        color={
          mode === "light"
            ? theme.palette.common.black
            : theme.palette.common.white
        }
      >
        No breweries found. Try adjusting your filters.
      </Typography>
    </Stack>
  );
}
