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
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

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
  const {authUser} = useAuthContext();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [images, setImages] = useState("")   // for photo
  const [url, setUrl] = useState("")
  const navigate = useNavigate()
  const [image, setImage] = useState(null);   // for avatar
  const inputRef = useRef(null);

 

    // Toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

  // const handleImageUpload = (event) => {
    // setFile(event.target.files[0]);
 // };


//  try {
//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   }

// const token = getCookie('token');

// const response = await fetch("http://localhost:3000/api/v1/logout", {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorisation': `Bearer ${token}`,
//     },
// });

// console.log(response);

useEffect(() => {
  // saving post to mongodb
  if (url) {
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log(token)
    fetch("/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`, // Replace yourToken with the actual token value
      },
      body: JSON.stringify({
        userId: authUser.data.loginUser.id,
        caption: body, // Assuming 'body' is your post caption
        image: url
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          notifyB("Successfully Posted");
          navigate("/home");
        } else {
          notifyA(data.message);
        }
      })
      .catch(err => console.error(err));
  }
}, [url]);



// posting image to cloudinary
const postDetails = () => {
 setOpen(false)
  console.log(body, images)     
  const data = new FormData()
  data.append("file", images)
  data.append("upload_preset", "SocioRoom")
  data.append("cloud_name", "socioroom")
  fetch("https://api.cloudinary.com/v1_1/socioroom/image/upload", {
    method: "POST",
    body: data
  }).then(res => res.json())
    .then(data => setUrl(data.url))
    .catch(err => console.log(err))
  //  console.log(url)

}


// const loadfile = (event) => {
//   var output = document.getElementById("output");
//   output.src = URL.createObjectURL(event.target.files[0]);
//   output.onload = function () {
//     URL.revokeObjectURL(output.src); // free memory
//   };
// };

const loadfile = (event) => {
  var output = document.getElementById("output");
  if (output) { // Check if the element exists
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  } else { 
    // Display an error message to the user
    alert("Error: Element with ID 'output' not found");
  }
};


 
  // const handlePost = () => {
    
  //   const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

  //   const formdata = new FormData();
  //   formdata.append('file',file);
  //   formdata.append('content', postContent);
  
  //   axios.post('http://localhost:3000/upload',formdata, {
  //     headers: {
  //       'Authorisation': `Bearer ${token}`, // Replace yourToken with the actual token value
  //     }
  //   })
  //   .then(res => {
  //     setImage(res.data.image);
  //    onPostAdded({ content: postContent, image: res.data.image }); // Notify parent about the new post
  //    console.log(res.data.image); 
  //    setOpen(false)
  //     toast.success("post added ")
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     toast.error("post not posted")
  //   })
  // }
   
  // useEffect(()=>{
  //   axios.get('http://localhost:3000/getImage')
  //   .then(res => {
  //     setImage(res.data[0].image)

  //   // console.log("hello")
  //   //   console.log(res.data[0].image)
  //   })
   
  //   .catch(err => console.log(err))
  // },[])


  
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
          src={authUser.data.loginUser.image}
          sx={{ width: 30, height: 30 }}
        />
            <Typography fontWeight={500} variant="span">
              {authUser.data.loginUser.username}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => {
                loadfile(event);
                setImages(event.target.files[0])
              }}
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
            <Button onClick={() => { postDetails() }}>Post</Button>
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