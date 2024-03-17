import React, { useEffect, useState } from "react";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import axios from 'axios';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

const fetchUserData = async () => {
  try {
    const token = document.cookie.replace(/(?:(?:^|.;\s)token\s*=\s*([^;]).$)|^.*$/, '$1');
    const response = await axios.get('http://localhost:3000/user', {
      headers: {
        'Authorization': `Bearer ${token}`, // Fix the string interpolation here
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Rethrow the error to handle it where this function is called
  }
};

const Post = ({ key, username ,caption, image, likes, avatar}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUserData(userData);
        console.log("User Data:", userData); // Log userData here
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    };

    getUserData();
  }, []);

  console.log("Updated User Data:", userData);

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          userData ? (
            <Avatar src={userData.avatar} sx={{ bgcolor: "red" }} aria-label="recipe">
              {avatar}
            </Avatar>
          ) : (
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {avatar}
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        // title={title}
        subheader={username}
      />
      {image && <CardMedia
        component="img"
        height="20%"
        src={`http://localhost:3000/images/${image}`} // Fix the string interpolation here
        alt="image"
      />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
