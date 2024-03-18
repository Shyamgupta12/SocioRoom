import React, { useState, useEffect } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import Vcard from "../components/Vcard";
import toast from "react-hot-toast";

const MyPosts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/getuserpost");
        console.log(res);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setPosts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[20px]">
       <Box flex={4} p={{ xs: 0, md: 2 }} >
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
              caption={post.caption}
              image={post.image}
              likes={post.likes.length}
            // You can pass userId or any other necessary information if needed
            />
          ))}
        </>
      )}
    </Box>
    </div>
  );
};

export default MyPosts;
