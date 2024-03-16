import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Post from "./Posts";
import { useEffect } from "react";

const Feed = ({ posts }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, [3000]);
  }, []);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
        {posts.map(post => (
          <Post key={post.id} content={post.content} image={post.image} />
        ))}
      </>
      )}
    </Box>
  );
};

export default Feed;
