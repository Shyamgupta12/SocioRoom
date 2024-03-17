import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { Add as AddIcon, DateRange, Image } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = ({ onPostAdded }) => {
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
  };

 
  const handlePost = () => {
    
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    const formdata = new FormData();
    formdata.append('file',file);
    formdata.append('content', postContent);
  
    axios.post('http://localhost:3000/upload',formdata, {
      headers: {
        'Authorisation': `Bearer ${token}`, // Replace yourToken with the actual token value
      }
    })
    .then(res => {
      setImage(res.data.image);
     onPostAdded({ content: postContent, image: res.data.image }); // Notify parent about the new post
     console.log(res.data.image); 
     setOpen(false)
      toast.success("post added ")
    })
    .catch(err => {
      console.log(err);
      toast.error("post not posted")
    })
  }
   
  useEffect(()=>{
    axios.get('http://localhost:3000/getImage')
    .then(res => {
      setImage(res.data[0].image)

    // console.log("hello")
    //   console.log(res.data[0].image)
    })
   
    .catch(err => console.log(err))
  },[])


  
  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   // Retrieve userId from cookies or wherever it's stored
  //   const userIdFromCookie = document.cookie.split('; ').find(row => row.startsWith('userId'));
  //   if (userIdFromCookie) {
  //     const userId = userIdFromCookie.split('=')[1];
  //     setUserId(userId);
  //   } else {
  //     console.error("User ID cookie not found");
  //   }
  // }, []); // Empty dependency array to run effect only once when component mounts
    
  // const handlePost = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     formData.append("content", postContent);

  //     // Send the formData to your backend using Axios or fetch
  //     const response = await fetch("/api/v1/posts", {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Bearer ${userId}`, // Use userId here
  //       },
  //       body: formData,
  //     });

  //     // Check response status and handle accordingly
  //     if (response.ok) {
  //       console.log("Post created successfully!");
  //     } else {
  //       console.error("Failed to create post");
  //     }
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // };

  

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Create Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon color='inherit'/>
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={300}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3} 
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
          <Avatar
          src={`http://localhost:3000/images/${image}`}
          sx={{ width: 30, height: 30 }}
        />
            <Typography fontWeight={500} variant="span">
              John Doe
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
              ref={inputRef}
            />
            <label htmlFor="image-upload">
              <Image color="secondary" onClick={() => inputRef.current.click()} />
            </label>
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handlePost}>Post</Button>
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;