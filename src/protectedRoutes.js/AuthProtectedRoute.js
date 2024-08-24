import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { NAVIGATION_LINKS } from "../utils/constants";

const AuthProtectedRoute = ({ children }) => {
  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );
  return Object.keys(userDetails)?.length > 0 && userDetails?.token ? (
    <Navigate to={NAVIGATION_LINKS.home.path} />
  ) : (
    children
  );
};

export default AuthProtectedRoute;
