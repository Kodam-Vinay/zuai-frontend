import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  BACKGROUND_COLORS,
  CLOUDINARY_IMAGE_ACCESS_URL,
  NAVIGATION_LINKS,
  POPUP_TYPES,
  TEXT_COLORS,
} from "../../utils/constants";
import "../../App.css";
import { useSelector } from "react-redux";

const PostForm = ({
  formData,
  setFormData,
  handlePostForm,
  loading,
  isImageUploadClicked,
  handleImageUpload,
  handleFileDrop,
  handleDragOver,
  isSubmitClicked,
  checkAnyChangesMade,
}) => {
  const { pathname: activePath } = useLocation();
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const type = useSelector((store) => store?.popup?.type);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [activePath]);

  const handleClickImageUpload = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: value,
    }));
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        maxHeight: "500px",
        overflowY: "auto",
        paddingBottom: 10,
      }}
      onSubmit={handlePostForm}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "90%",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <TextField
          inputRef={titleInputRef}
          type="text"
          id="title"
          onChange={handleChangeInput}
          placeholder="Title"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: 0,
            },
            width: "90%",
          }}
          value={formData?.title}
        />

        <TextField
          multiline
          type="text"
          id="content"
          onChange={handleChangeInput}
          placeholder="Content"
          variant="outlined"
          sx={{
            width: "90%",
            marginRight: 4,
            fontSize: "40px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: 0,
            },
          }}
          value={formData?.content}
        />

        {loading && isImageUploadClicked ? (
          <p>Uploading....</p>
        ) : formData?.image ? (
          <Box
            sx={{
              display: "felx",
              flexDirection: "column",
              marginBottom: 2,
              width: "90%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <IconButton
                onClick={() => setFormData({ image: "" })}
                type="button"
                sx={{
                  height: 20,
                  width: 20,
                  zIndex: 20,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              component="img"
              src={CLOUDINARY_IMAGE_ACCESS_URL + formData?.image}
              alt={formData?.title}
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: 2,
              marginBottom: 2,
              cursor: "pointer",
            }}
            onClick={handleClickImageUpload}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                height: "100px",
                width: "200px",
                borderRadius: 5,
                backgroundColor: BACKGROUND_COLORS.IMAGE_BACKGROUND_COLOR,
                padding: 2,
              }}
            >
              <Typography
                textAlign={"center"}
                sx={{
                  fontWeight: "bold",
                  color: TEXT_COLORS.IMAGE_PLACEHOLDER_COLOR,
                }}
              >
                Title image Place Holder
              </Typography>
            </Box>
            <TextField
              inputRef={imageInputRef}
              onChange={(e) => handleImageUpload(e.target.files[0])}
              type="file"
              accept="image/*"
              variant="outlined"
              label="Upload Image"
              InputLabelProps={{ shrink: true }}
              sx={{
                display: "none",
                width: "100%",
              }}
            />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: BACKGROUND_COLORS.SECONDARY_COLOR,
            "&:hover": {
              bgcolor: BACKGROUND_COLORS.SECONDARY_COLOR,
              opacity: 0.8,
            },
            width: "100%",
            maxWidth: "324px",
            marginTop: 1,
            height: 50,
          }}
          disabled={
            !checkAnyChangesMade
              ? type === POPUP_TYPES.updatepost && !checkAnyChangesMade
              : loading
          }
        >
          {loading && isSubmitClicked ? (
            <CircularProgress
              sx={{
                color: BACKGROUND_COLORS.SECONDARY_COLOR,
              }}
            />
          ) : type === POPUP_TYPES.newpost ? (
            NAVIGATION_LINKS.addpost.label
          ) : (
            "Update Post"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default PostForm;
