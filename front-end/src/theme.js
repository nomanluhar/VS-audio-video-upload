import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#d32f2f",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px",
          margin: "20px 0",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
});

export default theme;
