import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { useState } from "react";

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
    <AppBar position="static" style={{ marginBottom: "20px" }}>
      <Toolbar>
        <SportsBarIcon />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Brewery App
        </Typography>
        <Avatar
          alt="User Avatar"
          src="/path-to-your-avatar-image.jpg"
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
