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
  IconButton,
  Typography,
} from "@mui/material";

const Vcard = ({ username, caption, image, likes, avatar }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to fetch user data
        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).$)|^.*$/, '$1')}`,
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the function to fetch user data
    fetchUserData();
  }, []);

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
        subheader={username}
      />
      {image && <CardMedia
        component="img"
        height="20%"
        src={`http://localhost:3000/images/${image}`}
        alt="image"
      />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorder />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Vcard;
