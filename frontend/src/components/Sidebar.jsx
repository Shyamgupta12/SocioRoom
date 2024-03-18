import {
    AccountBox,
    Article,
    Group,
    Home,
    Message,
    Mail,
    ModeNight,
    Person,
    Settings,
    Storefront,
  } from "@mui/icons-material";
  import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
  } from "@mui/material";
  import React from "react";
  import {Link} from "react-router-dom"
  const Sidebar = ({mode,setMode}) => {
    return (
      <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed">
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/home">
                <ListItemIcon>
                <Link to={"/home"}>  <Home /></Link>
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
          
          <Link to={"/myposts"}>
            
          <ListItem disablePadding>
              <ListItemButton component="" href="/myposts">
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <ListItemText primary="MyPosts" />
              </ListItemButton>
            </ListItem>
          </Link>
         

       <Link to={"/messages"}>
       <ListItem disablePadding>
              <ListItemButton component="a" href="/messages">
                <ListItemIcon>
                  <Mail/>
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItemButton>
            </ListItem>
       </Link>

            
           <Link to={"/follower"}>
           <ListItem disablePadding>
              <ListItemButton component="a" href="/follower">
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Follower" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            </ListItem>
           </Link>
              
                  
           <Link to={"/following"}>
           <ListItem disablePadding>
              <ListItemButton component="a" href="/following">
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Following" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            </ListItem>
           </Link>
              
            <ListItem disablePadding>
              <ListItemButton component="a" href="myprofile">
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
              <Link to={"/myprofile"}> <ListItemText primary="Profile" /></Link>
              </ListItemButton>
            </ListItem>

            {/* <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
              </ListItemButton>
            </ListItem> */}

          </List>
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;