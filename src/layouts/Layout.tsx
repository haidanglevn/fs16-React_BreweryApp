import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

type ThemeMode = "light" | "dark";

export type ThemeChangeProps = {
  mode: ThemeMode;
  changeTheme: () => void;
};

export default function Layout() {
  const [mode, setMode] = useState<ThemeMode>("light");

  const changeTheme = () => {
    console.log("changing mode");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ position: "relative" }}>
        <Header mode={mode} changeTheme={changeTheme} />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
