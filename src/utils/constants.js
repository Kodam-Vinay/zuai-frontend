import { Bounce, toast } from "react-toastify";
import HomeIcon from "../svgs/HomeIcon";
import Icon2 from "../svgs/Icon2";
import Icon3 from "../svgs/Icon3";
import Icon4 from "../svgs/Icon4";
import Icon5 from "../svgs/Icon5";
import Icon6 from "../svgs/Icon6";
import Icon7 from "../svgs/Icon7";
import Icon8 from "../svgs/Icon8";
import Icon9 from "../svgs/Icon9";

export const SIDEBAR_NAVIGATION_LINKS = {
  home: {
    path: "/",
    label: "Home",
    element: <HomeIcon />,
  },
  icon2: {
    path: "/icon2",
    label: "Icon2",
    element: <Icon2 />,
  },
  icon3: {
    path: "/icon3",
    label: "Icon3",
    element: <Icon3 />,
  },
  icon4: {
    path: "/icon4",
    label: "Icon4",
    element: <Icon4 />,
  },
  addpost: {
    path: "/add-post",
    label: "Add Post",
    element: <Icon5 />,
  },
  icon6: {
    path: "/icon6",
    label: "Icon6",
    element: <Icon6 />,
  },
  icon7: {
    path: "/icon7",
    label: "Icon7",
    element: <Icon7 />,
  },
  icon8: {
    path: "/icon8",
    label: "Icon8",
    element: <Icon8 />,
  },
  icon9: {
    path: "/icon9",
    label: "Icon9",
    element: <Icon9 />,
  },
};

export const NAVIGATION_LINKS = {
  ...SIDEBAR_NAVIGATION_LINKS,
  login: {
    path: "/login",
    label: "Login",
  },
  joinnow: {
    path: "/join-now",
    label: "Join Now",
  },
  postdetails: {
    path: "/post-details",
    label: "Post Details",
  },
};

export const POPUP_TYPES = {
  newpost: {
    title: "New Post",
  },
  updatepost: {
    title: "Update Post",
  },
};

export const BACKGROUND_COLORS = {
  WHITE_COLOR: "#ffffff",
  PRIMARY_COLOR: "#E5ECF3",
  SECONDARY_COLOR: "#6947BF",
  IMAGE_BACKGROUND_COLOR: "#D6DFE4",
  LOGIN_BUTTON_COLOR: "#FCFBFD",
};

export const BORDER_COLORS = {
  LOGIN_BUTTON_BORDER_COLOR: "#EAF0F2",
};

export const TEXT_COLORS = {
  IMAGE_PLACEHOLDER_COLOR: "#C1CCD6",
  HEADLINE_COLOR: "#1E2026",
  PUBLISHED_READTIME_LOGIN_COLOR: "#5B6170",
  PUBLISHED_DURATION_COLOR: "#7A8196",
};

export const API_URL = process.env.REACT_APP_LOCAL_URL;

export const storeToastError = ({ errorMessage }) => {
  toast.error(errorMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const storeToastSuccess = ({ successMessage }) => {
  toast.success(successMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const CLOUDINARY_IMAGE_ACCESS_URL =
  process.env.REACT_APP_IMAGE_ACCESS_URL;

export const checkAnyChangesMadeFn = (formData, postDetails) => {
  const checkTitleChange = formData?.title !== postDetails?.title;
  const checkContentChange = formData?.content !== postDetails?.content;
  const checkImageChange = formData?.image !== postDetails?.image;
  return checkImageChange || checkContentChange || checkTitleChange;
};
