import React, { useState, useEffect } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import Vcard from "../components/Vcard";

const MyPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = document.cookie.replace(
        //   /(?:(?:^|.;\s)token\s*=\s*([^;]).$)|^.*$/,
        //   "$1"
        // );
        const response = await fetch("/api/v1/getuserpost", {
          method: "GET",
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user posts");
        }
        console.log(response);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
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
          {posts.map((post) => (
            <Vcard
              key={post._id}
              caption={post.caption}
              image={post.image}
              likes={post.likes}
              // You can pass userId or any other necessary information if needed
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default MyPosts;
