import { Box, Typography } from "@mui/material";
import AuthForm from "../components/forms/AuthForm";
import { NAVIGATION_LINKS } from "../utils/constants";
import { useState } from "react";
import { postRequest } from "../api/apiCall";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const JoinNow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuthForm = async (e) => {
    e.preventDefault();
    const { email, password, name } = formData;
    if (!email || !password || !name) {
      setIsError(true);
      setError("Please fill in all fields");
    }
    const details = {
      email,
      password,
      name,
    };
    setLoading(true);
    const res = await postRequest({
      apiUrl: "users/join-now",
      setError,
      setIsError,
      details,
    });
    if (res?.status) {
      navigate(NAVIGATION_LINKS.home.path);
      dispatch(storeUserInfo(res?.data?.userDetails));
    } else {
      setIsError(true);
      setError(res?.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: "85%",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="h3"
        textAlign="center"
        sx={{
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        {NAVIGATION_LINKS.joinnow.label}
      </Typography>
      <AuthForm
        formData={formData}
        setFormData={setFormData}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        error={error}
        isError={isError}
        handleAuthForm={handleAuthForm}
        loading={loading}
      />
    </Box>
  );
};

export default JoinNow;
