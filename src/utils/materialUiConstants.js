import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  breakpoints: {
    values: {
      vxs: 0,
      xs: 300,
      mxs: 475,
      sm: 640,
      md: 768,
      mdl: 850,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
  zIndex: {
    drawer: 1200,
  },
});
