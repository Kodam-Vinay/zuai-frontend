import { Box, Button, Typography } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  CLOUDINARY_IMAGE_ACCESS_URL,
  NAVIGATION_LINKS,
  POPUP_TYPES,
  storeToastError,
  storeToastSuccess,
  TEXT_COLORS,
} from "../utils/constants";
import "../App.css";
import { useState } from "react";
import { deleteRequest } from "../api/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import {
  changeConfirmState,
  changePopupType,
  storePostDetails,
  togglePopupState,
} from "../redux/slices/popupSlice";

const CompletePostDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [data, setData] = useState({});
  const postDetails = data?.post ? data?.post : {};
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const isPopupOpen = useSelector((store) => store?.popup?.isOpen);
  const [postHoveredDetails, setPostHoveredDetails] = useState({ post_id: "" });

  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );

  useGetData({
    apiUrl: "posts/" + params?.post_id,
    setError,
    setIsError,
    setData,
    setLoading,
  });

  const handleDeletePost = async (post_id) => {
    const response = window.confirm("Are you sure you want to delete?");
    if (!response) {
      return;
    }
    // Delete post logic here
    dispatch(changeConfirmState(true));
    const res = await deleteRequest({
      apiUrl: "posts/" + post_id,
      setError,
      setIsError,
      details: {
        post_id,
      },
      token: userDetails?.token,
    });

    if (res?.status) {
      dispatch(changeConfirmState(false));
      storeToastSuccess({ successMessage: res?.message });
      navigate(NAVIGATION_LINKS.home.path);
    } else {
      storeToastError({ errorMessage: res?.message ? res?.message : error });
    }
  };

  const handleUpdatePost = () => {
    dispatch(togglePopupState(true));
    dispatch(changePopupType(POPUP_TYPES.updatepost));
    dispatch(storePostDetails(postDetails));
  };

  return (
    <Box
      sx={{
        maxHeight: {
          vxs: "85vh",
        },
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
        overflowY: "auto",
      }}
      onMouseEnter={() =>
        !isPopupOpen &&
        setPostHoveredDetails({
          post_id: postDetails?.post_id,
        })
      }
      onMouseLeave={() =>
        setPostHoveredDetails({
          post_id: "",
        })
      }
    >
      {loading ? (
        <Box>Loading.....</Box>
      ) : (
        <Link
          to={`${NAVIGATION_LINKS.postdetails.path}/${postDetails.post_id}`}
          style={{ color: "black" }}
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
          {postHoveredDetails?.post_id === postDetails?.post_id &&
            userDetails?.token && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    color: TEXT_COLORS.PUBLISHED_READTIME_LOGIN_COLOR,
                    backgroundColor: BACKGROUND_COLORS.LOGIN_BUTTON_COLOR,
                    ":hover": {
                      backgroundColor: BACKGROUND_COLORS.LOGIN_BUTTON_COLOR,
                      opacity: 0.7,
                    },
                    border: `1px solid ${BORDER_COLORS.LOGIN_BUTTON_BORDER_COLOR}`,
                  }}
                  onClick={() => handleUpdatePost(postDetails?.post_id)}
                >
                  <Edit />
                </Button>
                <Button
                  sx={{
                    color: BACKGROUND_COLORS.WHITE_COLOR,
                    backgroundColor: BACKGROUND_COLORS.SECONDARY_COLOR,
                    ":hover": {
                      backgroundColor: BACKGROUND_COLORS.SECONDARY_COLOR,
                      opacity: 0.7,
                    },
                    border: `1px solid ${BORDER_COLORS.LOGIN_BUTTON_BORDER_COLOR}`,
                  }}
                  onClick={() => handleDeletePost(postDetails?.post_id)}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            )}
        </Link>
      )}
    </Box>
  );
};

export default CompletePostDetails;
