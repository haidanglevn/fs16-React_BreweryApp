import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

function SearchBar({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const theme = useTheme();

  return (
    <TextField
      variant="outlined"
      label="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              color={theme.palette.mode === "dark" ? "primary" : "action"}
            />
          </InputAdornment>
        ),
      }}
      onChange={onChange}
      sx={{
        width: "50vw",
        backgroundColor: theme.palette.background.paper, // this ensures it works well on both dark and light themes
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: theme.palette.divider,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.action.hover,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
      }}
    />
  );
}

export default SearchBar;
