import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BACKGROUND_COLORS, NAVIGATION_LINKS } from "../utils/constants";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="h3"
        textAlign="center"
        marginBottom={4}
      >
        <span className="font-bold">404</span> Something Went Wrong
      </Typography>
      <Button
        sx={{
          color: BACKGROUND_COLORS.WHITE_COLOR,
          backgroundColor: BACKGROUND_COLORS.SECONDARY_COLOR,
          ":hover": {
            backgroundColor: BACKGROUND_COLORS.SECONDARY_COLOR,
            opacity: 0.7,
          },
        }}
        variant="contained"
        onClick={() => navigate(NAVIGATION_LINKS.home.path)}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default ErrorPage;
