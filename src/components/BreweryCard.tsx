import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Brewery } from "../types/Types";
import { Link } from "react-router-dom";

// function to clean the website url, remove the "http://" or "https://"
export const cleanURL = (url: string) => {
  return url.replace(/^https?:\/\//, "");
};

export const BreweryCard = (item: Brewery) => {
  return (
    <Card
      sx={{
        width: 345,
        height: 330,
      }}
    >
      <CardMedia
        component="img"
        alt="brewery image"
        height="140"
        image={`https://source.unsplash.com/500x400/?brewery-${Math.floor(
          Math.random() * 30
        )}`}
      />
      <div
        className="card_content_wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          height: "calc(100% - 140px)",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`🏙️ ${item.city}, ${item.state}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.website_url ? `🌐 ${cleanURL(item.website_url)}` : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.phone ? `📱 +1 ${item.phone}` : ""}
          </Typography>
        </CardContent>
        <CardActions sx={{ margin: "0 auto" }}>
          <Button
            size="small"
            variant="contained"
            sx={{ margin: "0 5px" }}
            color="primary"
          >
            <Link
              to={`brewery/${item.id}`}
              state={{ data: item as Brewery }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Learn more
            </Link>
          </Button>
          <Button
            size="small"
            variant="contained"
            component="a"
            href={item.website_url}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            Visit website
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};
