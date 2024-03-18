import React, { useEffect, useState } from "react";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

const Vcard = ({ caption, image, likes }) => {
  // const [userData, setUserData] = useState(null);
  const { authUser } = useAuthContext();

  console.log({image});
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // Make a request to fetch user data
  //       const response = await axios.get('http://localhost:3000/user', {
  //         headers: {
  //           'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).$)|^.*$/, '$1')}`,
  //         }
  //       });
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   // Call the function to fetch user data
  //   fetchUserData();
  // }, []);

  return (
    <div style={{ margin:'150px',display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
         <Card sx={{  width:400}}>
      <CardHeader
        avatar={
          authUser.data.loginUser ? (
            <Avatar src={authUser.data.loginUser.image} sx={{ bgcolor: "red" }} aria-label="recipe">
              {/* {avatar} */}
            </Avatar>
          ) : (
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {/* {avatar} */}
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        // subheader={username}
      />
      {image && <CardMedia
        component="img"
        height="200px"
        src={image}
        alt="image"
      />}
      <CardContent sx={{height:100, overflow:'auto'}}>
        <Typography variant="body2" color="text.secondary " fontWeight='bold'>
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {likes}
          <FavoriteBorder />
        </IconButton>
        {/* <IconButton aria-label="share">
          <Share />
        </IconButton> */}
      </CardActions>
    </Card>
    </div>
   
  );
};

export default Vcard;