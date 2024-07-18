import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6504B5",
    },
    secondary: {
      main: "#666f73",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained", // Uncomment if you want contained to be the default variant
      },
      styleOverrides: {
        root: {
          padding: "8px 24px",
        },
        contained: {
          background: "linear-gradient(45deg, #8E2DE2 30%, #4A00E0 90%)",
          color: "#ffffff", // Ensure the text color is readable against the gradient background
        },
        outlined: {
          borderColor: "#6504B5", // Customize border color for outlined variant
          color: "#6504B5", // Customize text color for outlined variant
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
  typography: {
    body1: {
      color: "#0B1134CC",
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";
