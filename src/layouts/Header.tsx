import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import BeerLogo from "../assets/beer.png";
import { ThemeChangeProps } from "./Layout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC<ThemeChangeProps> = ({ mode, changeTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

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
    <AppBar
      position="static"
      style={{
        height: "60px",
        display: "flex",
        justifyContent: "center",
        padding: "0 30px",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
          <Stack direction={"row"}>
            <img
              src={BeerLogo}
              style={{ height: "40px", marginRight: "10px" }}
              alt="Beer logo"
              onClick={() => navigate("/")}
            />
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Brewery App
            </Typography>
          </Stack>
        </Link>

        <Stack direction={"row"} gap={2}>
          <IconButton onClick={changeTheme}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
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
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Header;
