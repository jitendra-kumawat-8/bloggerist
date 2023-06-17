import { createTheme } from "@mui/material/styles";

const whiteColor = "#FFF";
const lightColor = "76, 78, 100";

export const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: whiteColor,
    },
    primary: {
      light: "#787EFF",
      main: "#666CFF",
      dark: "#5A5FE0",
      contrastText: whiteColor,
    },
    secondary: {
      light: "#7F889B",
      main: "#6D788D",
      dark: "#606A7C",
      contrastText: whiteColor,
    },
    error: {
      light: "#FF625F",
      main: "#FF4D49",
      dark: "#E04440",
      contrastText: whiteColor,
    },
    warning: {
      light: "#FDBE42",
      main: "#FDB528",
      dark: "#DF9F23",
      contrastText: whiteColor,
    },
    info: {
      light: "#40CDFA",
      main: "#26C6F9",
      dark: "#21AEDB",
      contrastText: whiteColor,
    },
    success: {
      light: "#83E542",
      main: "#72E128",
      dark: "#64C623",
      contrastText: whiteColor,
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#F5F5F5",
      A200: "#EEEEEE",
      A400: "#BDBDBD",
      A700: "#616161",
    },
    text: {
      primary: `rgba(${lightColor}, 0.87)`,
      secondary: `rgba(${lightColor}, 0.6)`,
      disabled: `rgba(${lightColor}, 0.38)`,
    },
    divider: `rgba(${lightColor}, 0.12)`,
    background: {
      paper: whiteColor,
    },
    action: {
      active: `rgba(${lightColor}, 0.54)`,
      hover: `rgba(${lightColor}, 0.05)`,
      hoverOpacity: 0.05,
      selected: `rgba(${lightColor}, 0.08)`,
      disabled: `rgba(${lightColor}, 0.26)`,
      disabledBackground: `rgba(${lightColor}, 0.12)`,
      focus: `rgba(${lightColor}, 0.12)`,
    },
  },
  typography: {
    fontFamily: "montserrat-regular",
  },
});
