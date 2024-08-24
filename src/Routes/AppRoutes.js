import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Body from "../components/Body";
import ErrorPage from "../pages/ErrorPage";
import { NAVIGATION_LINKS } from "../utils/constants";
import Login from "../auth/Login";
import JoinNow from "../auth/JoinNow";
import AuthProtectedRoute from "../protectedRoutes.js/AuthProtectedRoute";
import CompletePostDetails from "../pages/CompletePostDetails";

const AppRoutes = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <Body />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: NAVIGATION_LINKS.home.path,
          element: <Home />,
        },
        {
          path: `${NAVIGATION_LINKS.postdetails.path}/:post_id`,
          element: <CompletePostDetails />,
        },
        {
          path: NAVIGATION_LINKS.login.path,
          element: (
            <AuthProtectedRoute>
              <Login />
            </AuthProtectedRoute>
          ),
        },
        {
          path: NAVIGATION_LINKS.joinnow.path,
          element: (
            <AuthProtectedRoute>
              <JoinNow />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={browserRouter} />;
};

export default AppRoutes;
