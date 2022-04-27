import {createTheme} from "@mui/material";

const theme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        size: 20,
      },
    },
    MuiTypography: {
      defaultProps: {
        color: "textPrimary",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    // text: {
    //   primary: "#fff",
    // },
    // primary: {
    //   main: "#151D3B",
    // },
    // error: {
    //   main: "#D82148",
    // },
    // secondary: {
    //   main: "#6EBF8B",
    // },
    // action: {
    //   main: "#DADBBD",
    // },
    // background: {
    //   default: "#191919",
    // },
  },
});
export default theme;
