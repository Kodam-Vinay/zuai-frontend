import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Body from "../components/Body";
import ErrorPage from "../pages/ErrorPage";
import { NAVIGATION_LINKS } from "../utils/constants";
import Login from "../auth/Login";
import JoinNow from "../auth/JoinNow";
import AuthProtectedRoute from "../protectedRoutes.js/AuthProtectedRoute";
import CompletePostDetails from "../components/CompletePostDetails";

const AppRoutes = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <Body />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
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
      ],
    },
  ]);
  return <RouterProvider router={browserRouter} />;
};

export default AppRoutes;
