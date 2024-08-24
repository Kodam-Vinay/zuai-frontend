import { Box, Typography } from "@mui/material";
import {
  BACKGROUND_COLORS,
  CLOUDINARY_IMAGE_ACCESS_URL,
  dateFormatter,
  NAVIGATION_LINKS,
} from "../utils/constants";
import "../App.css";
import { Link } from "react-router-dom";

const EachPost = ({ postDetails }) => {
  return (
    <Link
      to={`${NAVIGATION_LINKS.postdetails.path}/${postDetails.post_id}`}
      style={{ color: "black" }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 2,
          padding: 1,
          paddingLeft: 2,
          paddingRight: 2,
          borderRadius: "12px",
          backgroundColor: BACKGROUND_COLORS.WHITE_COLOR,
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: "24px",
            }}
          >
            {postDetails?.title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: "14px",
            }}
          >
            {postDetails?.published_date
              ? dateFormatter(postDetails?.published_date)
              : new Date().getTime()}
          </Typography>
        </Box>
        <Typography
          variant="p"
          sx={{
            fontSize: "14px",
          }}
        >
          {postDetails?.content}
        </Typography>
        {postDetails?.image && (
          <Box
            component="img"
            src={CLOUDINARY_IMAGE_ACCESS_URL + postDetails?.image}
            alt={postDetails?.title}
            sx={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              objectFit: "cover",
              marginTop: 1,
            }}
          />
        )}
      </Box>
    </Link>
  );
};

export default EachPost;
