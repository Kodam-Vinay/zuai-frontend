import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { BACKGROUND_COLORS, storeToastError } from "../utils/constants";
import { useState } from "react";
import useGetData from "../hooks/useGetData";
import Posts from "../components/Posts";

const Home = () => {
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

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
      storeToastError({ errorMessage: "Please enter at least one character" });
    } else {
      setSearchClicked(true);
    }
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
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
