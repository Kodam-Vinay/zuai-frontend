import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Logo from "../svgs/Logo";
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  NAVIGATION_LINKS,
  TEXT_COLORS,
} from "../utils/constants";
import { Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUserInfo } from "../redux/slices/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );

  const handleLogout = () => {
    const response = window.confirm("are you sure you want to logout ?");
    if (response) {
      dispatch(storeUserInfo({}));
      navigate(NAVIGATION_LINKS.login.path);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: "5%" }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: BACKGROUND_COLORS.WHITE_COLOR,
            boxShadow: "none",
            paddingRight: {
              vxs: 0,
              xs: 1,
              mxs: 2,
            },
            paddingLeft: {
              vxs: 0,
              xs: 1,
              mxs: 2,
            },
          }}
        >
          <IconButton
            onClick={() => navigate(NAVIGATION_LINKS.home.path)}
            size="large"
            edge="start"
            sx={{
              mr: 2,
              padding: 2,
              ":hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Logo />
          </IconButton>
          <Box variant="h6" component="div" sx={{ flexGrow: 1 }} />
          {userDetails?.token ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar />
              <Button
                onClick={handleLogout}
                sx={{
                  color: TEXT_COLORS.PUBLISHED_READTIME_LOGIN_COLOR,
                  backgroundColor: BACKGROUND_COLORS.LOGIN_BUTTON_COLOR,
                  ":hover": {
                    backgroundColor: BACKGROUND_COLORS.LOGIN_BUTTON_COLOR,
                    opacity: 0.7,
                  },
                  textTransform: "capitalize",
                  paddingLeft: 1,
                  paddingRight: 1,
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  border: `1px solid ${BORDER_COLORS.LOGIN_BUTTON_BORDER_COLOR}`,
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                onClick={() => navigate(NAVIGATION_LINKS.login.path)}
                sx={{
                  color: TEXT_COLORS.PUBLISHED_READTIME_LOGIN_COLOR,
                  backgroundColor: BACKGROUND_COLORS.LOGIN_BUTTON_COLOR,
                  ":hover": {
                    backgroundColor: BACKGROUND_COLORS.LOGIN_BUTTON_COLOR,
                    opacity: 0.7,
                  },
                  textTransform: "capitalize",
                  paddingLeft: 1,
                  paddingRight: 1,
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  border: `1px solid ${BORDER_COLORS.LOGIN_BUTTON_BORDER_COLOR}`,
                }}
              >
                {NAVIGATION_LINKS.login.label}
              </Button>
              <Button
                onClick={() => navigate(NAVIGATION_LINKS.joinnow.path)}
                sx={{
                  color: BACKGROUND_COLORS.WHITE_COLOR,
                  backgroundColor: BACKGROUND_COLORS.SECONDARY_COLOR,
                  ":hover": {
                    backgroundColor: BACKGROUND_COLORS.SECONDARY_COLOR,
                    opacity: 0.7,
                  },
                  paddingLeft: 1,
                  paddingRight: 1,
                  textTransform: "capitalize",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  border: `1px solid ${BORDER_COLORS.LOGIN_BUTTON_BORDER_COLOR}`,
                }}
              >
                {NAVIGATION_LINKS.joinnow.label}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
