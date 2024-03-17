import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar'
import RightSidebar from './RighSidebar'
import Feed from './Feed'
import {Box , Container , Stack , ThemeProvider,createTheme} from "@mui/material"
import Add from "./Add";
import { useState } from "react";

const LoggedHome = () => {
  const [mode, setMode] = useState("light");
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };


  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Stack direction="row" spacing={2} justifyContent = "space-between">
      {/* <Navbar /> */}
       <Sidebar  setMode={setMode} mode={mode} />
       <Feed />
       <RightSidebar />
      </Stack>
     <Add onPostAdded={addPost} />
    </Box>
    </ThemeProvider>
  
  );
};

export default LoggedHome;