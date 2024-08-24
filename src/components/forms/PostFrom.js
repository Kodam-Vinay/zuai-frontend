import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BACKGROUND_COLORS, NAVIGATION_LINKS } from "../../utils/constants";
import "../../App.css";

const PostForm = ({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  handlePostForm,
  isError,
  error,
  loading,
}) => {
  const { pathname: activePath } = useLocation();
  const nameInputRef = useRef();
  const emailInputRef = useRef();

  useEffect(() => {
    if (activePath === NAVIGATION_LINKS.login.path) {
      emailInputRef.current.focus();
    }
    if (activePath === NAVIGATION_LINKS.joinnow.path) {
      nameInputRef.current.focus();
    }
  }, [activePath]);

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
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onSubmit={handlePostForm}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {activePath === NAVIGATION_LINKS.joinnow.path && (
          <TextField
            inputRef={nameInputRef}
            type="text"
            id="name"
            label="Name"
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: "324px",
              "& .MuiInputBase-input": {
                color: BACKGROUND_COLORS.SECONDARY_COLOR,
              },
              "& .MuiInputLabel-root": {
                color: BACKGROUND_COLORS.SECONDARY_COLOR,
                "&.Mui-focused": {
                  color: BACKGROUND_COLORS.SECONDARY_COLOR,
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: BACKGROUND_COLORS.SECONDARY_COLOR,
                },
                "&:hover fieldset": {
                  borderColor: BACKGROUND_COLORS.SECONDARY_COLOR,
                },
                "&.Mui-focused fieldset": {
                  borderColor: BACKGROUND_COLORS.SECONDARY_COLOR,
                },
              },
            }}
            value={formData?.name}
            onChange={handleChangeInput}
            autoComplete="name"
          />
        )}

        <TextField
          inputRef={emailInputRef}
          type={"email"}
          id="email"
          label={"Email Address"}
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: "324px",
            "& .MuiInputBase-input": {
              color: BACKGROUND_COLORS.SECONDARY_COLOR,
            },
            "& .MuiInputLabel-root": {
              color: BACKGROUND_COLORS.SECONDARY_COLOR,
              "&.Mui-focused": {
                color: BACKGROUND_COLORS.SECONDARY_COLOR,
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: BACKGROUND_COLORS.SECONDARY_COLOR,
              },
              "&:hover fieldset": {
                borderColor: BACKGROUND_COLORS.SECONDARY_COLOR,
              },
              "&.Mui-focused fieldset": {
                borderColor: BACKGROUND_COLORS.SECONDARY_COLOR,
              },
            },
          }}
          value={formData?.email}
          onChange={handleChangeInput}
          autoComplete="email"
        />
        <FormControl
          sx={{
            marginTop: 1,
            width: "100%",
            maxWidth: "324px",
            "& .MuiInputBase-input": {
              color: BACKGROUND_COLORS.SECONDARY_COLOR,
            },
            "& .MuiInputLabel-root": {
              color: BACKGROUND_COLORS.SECONDARY_COLOR,
              "&.Mui-focused": {
                color: BACKGROUND_COLORS.SECONDARY_COLOR,
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: BACKGROUND_COLORS.SECONDARY_COLOR,
              },
              "&:hover fieldset": {
                borderColor: BACKGROUND_COLORS.SECONDARY_COLOR,
              },
              "&.Mui-focused fieldset": {
                borderColor: BACKGROUND_COLORS.SECONDARY_COLOR,
              },
            },
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            password
          </InputLabel>
          <OutlinedInput
            onChange={handleChangeInput}
            id={"password"}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{
                    color: BACKGROUND_COLORS.SECONDARY_COLOR,
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={formData?.password}
            label={"Password"}
            autoComplete="current-password"
          />
        </FormControl>
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
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: BACKGROUND_COLORS.SECONDARY_COLOR,
              }}
            />
          ) : activePath === NAVIGATION_LINKS.login.path ? (
            NAVIGATION_LINKS.login.label
          ) : (
            NAVIGATION_LINKS.joinnow.label
          )}
        </Button>
        {isError && (
          <Typography
            variant="p"
            component="p"
            marginBottom={4}
            sx={{
              color: "red",
            }}
          >
            {error}*
          </Typography>
        )}
      </Box>
    </form>
  );
};

export default PostForm;
