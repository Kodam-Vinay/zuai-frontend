import { Box, IconButton, Typography } from "@mui/material";
import PostForm from "./forms/PostFrom";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { postRequest, updateRequest } from "../api/apiCall";
import {
  BACKGROUND_COLORS,
  checkAnyChangesMadeFn,
  POPUP_TYPES,
  storeToastError,
  storeToastSuccess,
} from "../utils/constants";
import {
  changeConfirmState,
  togglePopupState,
} from "../redux/slices/popupSlice";

const Popup = () => {
  const dispatch = useDispatch();
  const type = useSelector((store) => store?.popup?.type);
  const postDetails = useSelector((store) => store?.popup?.post_details);
  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [isImageUploadClicked, setImageUploadClicked] = useState(false);
  const [isSubmitClicked, setSubmitClicked] = useState(false);

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const checkAnyChangesMade = checkAnyChangesMadeFn(formData, postDetails);

  useEffect(() => {
    if (type === POPUP_TYPES.updatepost) {
      setFormData({
        title: postDetails?.title,
        content: postDetails?.content,
        image: postDetails?.image ? postDetails?.image : "",
      });
    }
  }, [type, isImageUploadClicked]);

  const uploadImageToDb = async (image) => {
    setImageUploadClicked(true);
    setSubmitClicked(false);
    const formData = new FormData();
    formData.append("image", image);
    setLoading(true);
    const res = await postRequest({
      apiUrl: "posts/upload-image",
      details: formData,
      setError,
      setIsError,
      token: userDetails?.token,
      type: "image",
    });
    if (res?.status) {
      setFormData((prev) => ({ ...prev, image: res?.data?.image }));
      storeToastSuccess({ successMessage: res?.message });
    } else {
      storeToastError({ errorMessage: res?.message });
    }
    setLoading(false);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    uploadImageToDb(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImageUpload = (image) => {
    uploadImageToDb(image);
  };

  const handleCreatePost = async () => {
    setSubmitClicked(true);
    setImageUploadClicked(false);
    if (!formData?.title || !formData?.content) {
      storeToastError({ errorMessage: "Please fill in all fields" });
    }
    dispatch(changeConfirmState(true));
    const res = await postRequest({
      apiUrl: "posts",
      details: formData,
      setError,
      setIsError,
      token: userDetails?.token,
      type: "post",
    });
    if (res?.status) {
      storeToastSuccess({ successMessage: res?.message });
      dispatch(togglePopupState(false));
      dispatch(changeConfirmState(false));
    } else {
      storeToastError({ errorMessage: res?.message });
    }
  };

  const handleUpdatePost = async () => {
    setSubmitClicked(true);
    setImageUploadClicked(false);
    console.log(formData);
    if (!formData?.title || !formData?.content) {
      storeToastError({ errorMessage: "Please fill all the fields" });
    }
    dispatch(changeConfirmState(true));
    const res = await updateRequest({
      apiUrl: "posts/" + postDetails?.post_id,
      details: formData,
      setError,
      setIsError,
      token: userDetails?.token,
    });
    if (res?.status) {
      storeToastSuccess({ successMessage: res?.message });
      dispatch(togglePopupState(false));
      dispatch(changeConfirmState(false));
    } else {
      storeToastError({ errorMessage: res?.message });
    }
  };

  const handlePostForm = (e) => {
    e.preventDefault();
    if (type === POPUP_TYPES.newpost) {
      handleCreatePost();
    } else {
      handleUpdatePost();
    }
  };

  return (
    <Box
      sx={{
        width: {
          vxs: "90%",
          md: "95%",
          lg: "97%",
        },
        maxHeight: "88%",
        position: "absolute",
        right: 0,
        bottom: 0,
        borderTopLeftRadius: "20px",
        marginRight: 1,
        backgroundColor: BACKGROUND_COLORS.IMAGE_BACKGROUND_COLOR,
        zIndex: 100,
        maxWidth: "400px",
        padding: 1,
      }}
    >
      <Box
        sx={{
          height: "100%",
          marginTop: "auto",
        }}
      >
        <Box
          sx={{
            display: "felx",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {type === POPUP_TYPES.newpost ? "Add Post" : "Update Post"}
          </Typography>
          <IconButton
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
            onClick={() => dispatch(togglePopupState(false))}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <PostForm
          setFormData={setFormData}
          formData={formData}
          isError={isError}
          error={error}
          loading={loading}
          isImageUploadClicked={isImageUploadClicked}
          isSubmitClicked={isSubmitClicked}
          handleImageUpload={handleImageUpload}
          handleFileDrop={handleFileDrop}
          handleDragOver={handleDragOver}
          handlePostForm={handlePostForm}
          checkAnyChangesMade={checkAnyChangesMade}
        />
      </Box>
    </Box>
  );
};

export default Popup;
