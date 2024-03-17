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
  Typography,
} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom"

const Sidebar = ({mode, setMode}) => {
  return (
      <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <Box position="fixed">
              <List>
                  <ListItem disablePadding>
                      <ListItemButton component="a" href="#home">
                          <ListItemIcon>
                              <Link to={"/home"}><Home /></Link>
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body1" fontWeight="bold">Homepage</Typography>} />
                      </ListItemButton>
                  </ListItem>
                  <Link to={"/myposts"}>
                      <ListItem disablePadding>
                          <ListItemButton component="" href="#simple-list">
                              <ListItemIcon>
                                  <Article />
                              </ListItemIcon>
                              <ListItemText primary={<Typography variant="body1" fontWeight="bold">MyPosts</Typography>} />
                          </ListItemButton>
                      </ListItem>
                  </Link>

                  <Link to={"/messages"}>
                      <ListItem disablePadding>
                          <ListItemButton component="a" href="#simple-list">
                              <ListItemIcon>
                                  <Mail/>
                              </ListItemIcon>
                              <ListItemText primary={<Typography variant="body1" fontWeight="bold">Messages</Typography>} />
                          </ListItemButton>
                      </ListItem>
                  </Link>

                  <ListItem disablePadding>
                      <ListItemButton component="a" href="#simple-list">
                          <ListItemIcon>
                              <Person />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body1" fontWeight="bold">Friends</Typography>} />
                      </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                  </ListItem>
                  <ListItem disablePadding>
                      <ListItemButton component="a" href="#simple-list">
                          <ListItemIcon>
                              <AccountBox />
                          </ListItemIcon>
                          <Link to={"/myprofile"}><ListItemText primary={<Typography variant="body1" fontWeight="bold">Profile</Typography>} /></Link>
                      </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                      <ListItemButton component="a" href="#simple-list">
                          <ListItemIcon>
                              <ModeNight />
                          </ListItemIcon>
                          <Switch onChange={e => setMode(mode === "light" ? "dark" : "light")} />
                      </ListItemButton>
                  </ListItem>
              </List>
          </Box>
      </Box>
  );
};

export default Sidebar;
