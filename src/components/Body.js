import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { BACKGROUND_COLORS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { useEffect } from "react";
import { togglePopupState } from "../redux/slices/popupSlice";

const Body = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isPopupOpen = useSelector((store) => store?.popup?.isOpen);

  useEffect(() => {
    dispatch(togglePopupState(false));
  }, [pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      {/* header */}
      <Header />

      {/* sidebar, main ui */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "95%",
        }}
      >
        <SideBar />
        {isPopupOpen && <Popup />}
        <Box
          sx={{
            backgroundColor: BACKGROUND_COLORS.PRIMARY_COLOR,
            borderTopLeftRadius: "10px",
            padding: 1,
            width: "95%",
            marginTop: {
              vxs: 3,
              sm: 4,
              md: 5,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
