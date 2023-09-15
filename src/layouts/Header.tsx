import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import BeerLogo from "../assets/beer.png";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    console.log("Logging in...");
  };

  return (
    <AppBar position="static" style={{ marginBottom: "20px", height: "60px" }}>
      <Toolbar>
        <img
          src={BeerLogo}
          style={{ height: "40px", marginRight: "10px" }}
          alt="Beer logo"
        />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Brewery App
        </Typography>
        <Avatar
          alt="User Avatar"
          src="https://source.unsplash.com/500x400/?face"
          onClick={handleMenuOpen}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
