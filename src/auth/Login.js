import { Box, Typography } from "@mui/material";
import { NAVIGATION_LINKS } from "../utils/constants";
import AuthForm from "../components/forms/AuthForm";
import { useState } from "react";
import { postRequest } from "../api/apiCall";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthForm = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setIsError(true);
      setError("Please fill in all fields");
    }
    const details = {
      email,
      password,
    };
    const res = await postRequest({
      apiUrl: "users/login",
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
        {NAVIGATION_LINKS.login.label}
      </Typography>
      <AuthForm
        formData={formData}
        setFormData={setFormData}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        error={error}
        isError={isError}
        handleAuthForm={handleAuthForm}
      />
    </Box>
  );
};

export default Login;
