import { Box, Divider, IconButton } from "@mui/material";
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  NAVIGATION_LINKS,
  SIDEBAR_NAVIGATION_LINKS,
} from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { cloneElement } from "react";

const SideBar = () => {
  const navigate = useNavigate();
  const acitvePath = useLocation();

  return (
    <Box
      sx={{
        width: 50,
        marginTop: {
          vxs: 3,
          sm: 4,
          md: 5,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      {Object.keys(SIDEBAR_NAVIGATION_LINKS).map((eachNavigation, index) => {
        return (
          <Box key={SIDEBAR_NAVIGATION_LINKS[eachNavigation].label + index}>
            {index === 3 || index === 7 ? (
              <>
                <Divider
                  sx={{
                    borderColor: BORDER_COLORS.LOGIN_BUTTON_BORDER_COLOR,
                    borderWidth: 1,
                    width: "80%",
                  }}
                />
                <IconButton
                  onClick={() =>
                    navigate(SIDEBAR_NAVIGATION_LINKS[eachNavigation].path)
                  }
                  sx={{
                    backgroundColor:
                      acitvePath.pathname ===
                      NAVIGATION_LINKS[eachNavigation].path
                        ? BACKGROUND_COLORS.SECONDARY_COLOR
                        : "",
                    color:
                      acitvePath.pathname ===
                      NAVIGATION_LINKS[eachNavigation].path
                        ? BACKGROUND_COLORS.WHITE_COLOR
                        : "",
                    height: 35,
                    width: 35,
                    borderRadius: 3,
                  }}
                >
                  {cloneElement(
                    SIDEBAR_NAVIGATION_LINKS[eachNavigation].element,
                    {
                      style: {
                        fill:
                          acitvePath.pathname ===
                          NAVIGATION_LINKS[eachNavigation].path
                            ? "white"
                            : "",
                      },
                    }
                  )}
                </IconButton>
              </>
            ) : index === 8 ? (
              <IconButton
                onClick={() =>
                  navigate(SIDEBAR_NAVIGATION_LINKS[eachNavigation].path)
                }
                sx={{
                  backgroundColor:
                    acitvePath.pathname ===
                    NAVIGATION_LINKS[eachNavigation].path
                      ? BACKGROUND_COLORS.SECONDARY_COLOR
                      : "",
                  color:
                    acitvePath.pathname ===
                    NAVIGATION_LINKS[eachNavigation].path
                      ? BACKGROUND_COLORS.WHITE_COLOR
                      : "",
                  height: 35,
                  width: 35,
                  borderRadius: 3,
                  marginTop: "auto",
                }}
              >
                {cloneElement(
                  SIDEBAR_NAVIGATION_LINKS[eachNavigation].element,
                  {
                    style: {
                      fill:
                        acitvePath.pathname ===
                        NAVIGATION_LINKS[eachNavigation].path
                          ? "white"
                          : "",
                    },
                  }
                )}
              </IconButton>
            ) : (
              <IconButton
                onClick={() =>
                  navigate(SIDEBAR_NAVIGATION_LINKS[eachNavigation].path)
                }
                sx={{
                  backgroundColor:
                    acitvePath.pathname ===
                    NAVIGATION_LINKS[eachNavigation].path
                      ? BACKGROUND_COLORS.SECONDARY_COLOR
                      : "",
                  color:
                    acitvePath.pathname ===
                    NAVIGATION_LINKS[eachNavigation].path
                      ? BACKGROUND_COLORS.WHITE_COLOR
                      : "",
                  height: 35,
                  width: 35,
                  borderRadius: 3,
                }}
              >
                {cloneElement(
                  SIDEBAR_NAVIGATION_LINKS[eachNavigation].element,
                  {
                    style: {
                      fill:
                        acitvePath.pathname ===
                        NAVIGATION_LINKS[eachNavigation].path
                          ? "white"
                          : "",
                    },
                  }
                )}
              </IconButton>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default SideBar;
