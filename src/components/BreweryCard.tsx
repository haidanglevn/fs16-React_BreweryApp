import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Brewery } from "../types/Types";

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
        image="https://source.unsplash.com/500x400/?beer-drinking"
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
            {item.website_url ? `🌐 ${item.website_url}` : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.phone ? `📱 +1 ${item.phone}` : ""}
          </Typography>
        </CardContent>
        <CardActions sx={{ margin: "0 auto" }}>
          <Button size="small" variant="contained" sx={{ margin: "0 5px" }}>
            Learn more
          </Button>
          <Button
            size="small"
            variant="contained"
            component="a"
            href={item.website_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};
