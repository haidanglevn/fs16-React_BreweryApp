import { useLocation } from "react-router-dom";
import { Brewery } from "../types/Types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { cleanURL } from "../components/BreweryCard";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import WebIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function BrewerySingle() {
  let { state } = useLocation();
  const brewery: Brewery = state.data;

  let theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack
      alignItems={"center"}
      sx={{
        backgroundColor: theme.palette.background.paper,
        paddingTop: 5,
        minHeight: "calc(100vh - 30px - 60px)",
        paddingBottom: 10,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: isLargeScreen ? "row-reverse" : "column",
          maxWidth: "1060px",
          minWidth: "80%",
        }}
      >
        <CardMedia
          component="img"
          alt="brewery image"
          sx={{
            height: isLargeScreen ? "inherit" : "300px",
            width: isLargeScreen ? "60vw" : "auto",
          }}
          image={`https://source.unsplash.com/500x400/?brewery-${Math.floor(
            Math.random() * 30
          )}`}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            height: "calc(100% - 140px)",
          }}
        >
          <CardContent>
            <Stack marginBottom={2}>
              <Typography gutterBottom variant="h5" component="div">
                {brewery.name}
              </Typography>
              <Typography>
                {capitalizeFirstLetter(brewery.brewery_type)}
              </Typography>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              padding={"5px 0"}
            >
              <PlaceIcon />
              <Typography variant="body2" color="text.secondary">
                {`${brewery.street}, ${brewery.postal_code}`}
              </Typography>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              padding={"5px 0"}
            >
              <LocationCityIcon />
              <Typography variant="body2" color="text.secondary">
                {`${brewery.city}, ${brewery.state}`}
              </Typography>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              padding={"5px 0"}
            >
              <WebIcon />
              <Typography variant="body2" color="text.secondary">
                {brewery.website_url ? `${cleanURL(brewery.website_url)}` : ""}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              padding={"5px 0"}
            >
              <PhoneIcon />
              <Typography variant="body2" color="text.secondary">
                {brewery.phone ? `+1 ${brewery.phone}` : ""}
              </Typography>
            </Stack>
            <Button
              size="large"
              variant="contained"
              component="a"
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              sx={{ marginTop: "10px" }}
            >
              Visit website
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Stack>
  );
}
