import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  POPUP_TYPES,
  storeToastError,
  TEXT_COLORS,
} from "../utils/constants";
import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import Posts from "../components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { changePopupType, togglePopupState } from "../redux/slices/popupSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const userDetails = useSelector(
    (store) => store?.persistSliceReducer?.user?.userInfo
  );

  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (!searchInput?.toString().trim()) {
      setIsError(true);
      setError("Please enter a search query");
    } else {
      setSearchClicked(true);
    }
  };

  const handleAddPost = () => {
    dispatch(togglePopupState(true));
    dispatch(changePopupType(POPUP_TYPES.newpost));
  };

  useGetData({
    apiUrl: "posts?search_q=" + searchInput,
    setData,
    setIsError,
    setError,
    isSearchClicked,
    setSearchClicked,
    setLoading,
  });

  useEffect(() => {
    if (isError) {
      storeToastError({ errorMessage: error });
    }
  }, [isError]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControl
          sx={{
            marginTop: 1,
            width: "100%",
            maxWidth: "324px",
            height: "40px",
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
          <OutlinedInput
            onKeyDown={handleSearchInput}
            onChange={handleChangeInput}
            placeholder="Enter some text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSearch}
                  aria-label="toggle password visibility"
                  edge="end"
                  sx={{
                    color: BACKGROUND_COLORS.SECONDARY_COLOR,
                  }}
                >
                  {<SearchIcon />}
                </IconButton>
              </InputAdornment>
            }
            value={searchInput}
          />
        </FormControl>
        {userDetails?.token && (
          <Button
            onClick={handleAddPost}
            sx={{
              color: TEXT_COLORS.PUBLISHED_READTIME_LOGIN_COLOR,
              backgroundColor: BACKGROUND_COLORS.LOGIN_BUTTON_COLOR,
              ":hover": {
                backgroundColor: BACKGROUND_COLORS.LOGIN_BUTTON_COLOR,
                opacity: 0.7,
              },
              textTransform: "capitalize",
              paddingLeft: 1,
              paddingRight: 1,
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
              border: `1px solid ${BORDER_COLORS.LOGIN_BUTTON_BORDER_COLOR}`,
              marginLeft: 2,
            }}
          >
            New Post +
          </Button>
        )}
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          marginTop: 5,
          height: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Posts posts={data?.posts} loading={loading} />
      </Box>
    </Box>
  );
};

export default Home;
