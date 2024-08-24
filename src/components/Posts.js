import { Box } from "@mui/material";
import EachPost from "./EachPost";

const Posts = ({ posts, loading }) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {loading && posts?.length === 0 ? (
        <span>Loading...</span>
      ) : !loading && posts?.length === 0 ? (
        <span>No Posts Found</span>
      ) : (
        posts?.map((eachPost) => (
          <EachPost key={eachPost?.post_id} postDetails={eachPost} />
        ))
      )}
    </Box>
  );
};

export default Posts;
