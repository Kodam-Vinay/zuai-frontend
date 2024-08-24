import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import { Box, ThemeProvider } from "@mui/material";
import { customTheme } from "./utils/materialUiConstants";
import AppRoutes from "./Routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <Box
          sx={{
            height: {
              vxs: "99vh",
              sm: "100vh",
            },
          }}
        >
          <ToastContainer />
          <AppRoutes />
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
