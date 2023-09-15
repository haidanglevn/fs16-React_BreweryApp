import { Stack, Typography } from "@mui/material";
import beerMug from "../assets/clinking-beer-mugs.gif";

export default function Loading() {
  return (
    <Stack
      padding={"0 50px"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"fixed"}
      zIndex={10}
      top={"30vh"}
    >
      <img src={beerMug} alt="" style={{ height: "300px" }} />
      <Typography
        variant="h1"
        fontSize={30}
        paddingTop={"20px"}
        color={"yellow"}
        sx={{
          fontFamily: "Pacifico, cursive",
          textShadow: `-1px -1px 0 #000,  
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000`,
        }}
      >
        Finding your breweries... <br></br> Please wait 😉
      </Typography>
    </Stack>
  );
}
