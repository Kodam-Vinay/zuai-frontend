import { Box, Button, Typography } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  CLOUDINARY_IMAGE_ACCESS_URL,
  NAVIGATION_LINKS,
  storeToastError,
  storeToastSuccess,
  TEXT_COLORS,
} from "../utils/constants";
import "../App.css";
import { useState } from "react";
import { deleteRequest } from "../api/apiCall";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const EachPost = ({ postDetails }) => {
  return (
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
      <Link
        to={`${NAVIGATION_LINKS.postdetails.path}/${postDetails.post_id}`}
        style={{ color: "black" }}
      >
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
            }}
          />
        )}
        <Typography
          variant="h3"
          sx={{
            fontSize: "24px",
          }}
        >
          {postDetails?.title}
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "14px",
          }}
        >
          {postDetails?.content}
        </Typography>
      </Link>
    </Box>
  );
};

export default EachPost;
