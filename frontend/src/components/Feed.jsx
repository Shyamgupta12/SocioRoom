import { Box, Stack, Skeleton,  } from "@mui/material";
import React, { useState } from "react";
// import Post from "./Posts";
import { useEffect } from "react";
import Vcard from "./Vcard";

const Feed =  () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, [3000]);
  }, []);


// const [posts,setPosts] = useState([]);

//     useEffect(()=>{
//       async function fetchData() {
//         try {
//           const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
//           const response = await fetch("http://localhost:3000/api/v1/feed",{
//             method: 'GET',
//             headers : {
//               "Authorization" : `Bearer ${token}`,
//             }
//           });
//             const data = await response.json();
//             data.forEach(post => {
//               console.log(post.userId);
//             });
//             setPosts(data);
//         }
//         catch(error){
//           console.error('Error fetching error:',error);
//         }
//       }
//       fetchData();
      
//     },[]);

const [posts, setPosts] = useState([]);

useEffect(() => {
  async function fetchData() {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      const response = await fetch("http://localhost:3000/api/v1/feed", {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      const data = await response.json();
      
      // Iterate over the data array to fetch user info for each post
      const postsWithUserInfo = await Promise.all(data.map(async post => {
        // Fetch user data for the userId
        const userResponse = await fetch(`http://localhost:3000/api/v1/user/${post.userId}`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        const userData = await userResponse.json();
        // console.log(userData);
        
        // Add user info to the post object
        return {
          ...post,
          user: userData // Assuming the user info is available under 'user' key
        };
      }));

      // Log the userId and username of each post
      postsWithUserInfo.forEach(post => {
        console.log(`UserID: ${post.userId}, Username: ${post.user.username}`);
      });

      setPosts(postsWithUserInfo);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
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
        {posts && posts.map(post => (
          <Vcard
            key={post._id}
            username={post.user.username} // Pass the username as a prop
            caption={post.caption}
            image={post.image}
            likes={post.likes}
            avatar={post.user.image} // Assuming the user image is available under 'image' key
          />
        ))}
      </>
      )}
    </Box>
  );
};

export default Feed;
