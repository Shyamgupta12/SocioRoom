
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
  
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Search from './Search';
import { NavLink } from 'react-router-dom';

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Navbar = ({isLoggedIn,setIsLoggedIn}) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  //  const fullName = `${user.firstName} ${user.lastName}`;
  const fullName = `Suraj`;


  
 
      const handleLogout = async () => {
          try {
              const response = await axios.post("http://localhost:3000/api/v1/userlogout"); 
              if (response.status === 200) {
                  // Clear token from local storage
                  localStorage.removeItem('token');
                  // Update login state
                  setIsLoggedIn(false);
                  // Notify the user
                 toast.success('Logout successful');
              } else {
                 toast.error('Logout failed');
              }
          } catch (error) {
              console.error('Logout error:', error);
             toast.error('Logout failed');
          }
      
  
      return (
          <div>
              {isLoggedIn ? (
                  <button onClick={handleLogout}>Logout</button>
              ) : (
                  // Render login or signup button
                  <div>
                      <button>Login</button>
                      <button>Signup</button>
                  </div>
              )}
          </div>
      );
  };
  

  

    // const [navuser, setNavuser] = useState({});

    // useEffect(() => {
    //   const check = async () => {
    //     try {
    //       const loggedInUser = localStorage.getItem("user");
    //       if (loggedInUser) {
    //         const foundUser = JSON.parse(loggedInUser);
    //         setNavuser(foundUser);
    //         await setUser(foundUser);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   check();
    // }, [user?._id, flag]);
  
    // const handleLogout = () => {
    //   localStorage.clear();
    //   setIsLoggedIn(false);
    //   toast.success("Logged Out");

     

    return (
   
      <Box>
      {!isLoggedIn && 
 <header className='header flex '>
       <NavLink to="/" className="w-40 h-10 rounded-lg bg-white items-center 
       justify-center flex font-bold shadow-md">
           <p className='text-xl'>SOCIOROOM</p>
       </NavLink>
       <nav className='flex text-lg gap-7 font-medium' >
         {/* for toggle light and dark  mode */}
       <IconButton onClick={() => dispatch(setMode())}>
      {theme.palette.mode === "dark" ? (
        <DarkMode sx={{ fontSize: "25px" }} />
      ) : (
        <LightMode sx={{ color: dark, fontSize: "25px" }} />
      )}
    </IconButton>

           <NavLink to="/Login" className={({ isActive }) => isActive ? 
           'text-blue-500' : 'text-black'}>
               Login
           </NavLink>
           <NavLink to="/Signup" className={({ isActive }) => isActive ? 
           'text-blue-500' : 'text-black'}>
               Signup
           </NavLink>
       </nav>
  </header>
         }


         { isLoggedIn &&

<FlexBetween padding="1rem 6%" backgroundColor={alt}>
<FlexBetween gap="1.75rem">
  <Typography
    fontWeight="bold"
    fontSize="clamp(1rem, 2rem, 2.25rem)"
    color="primary"
    onClick={() => navigate("/home")}
    sx={{
      "&:hover": {
        color: primaryLight,
        cursor: "pointer",
      },
    }}
  >
    SocioRoom
  </Typography>
  {isNonMobileScreens && (
    <FlexBetween
      backgroundColor={neutralLight}
      borderRadius="9px"
      gap="3rem"
      padding="0.1rem 1.5rem"
    >
     <Link to="/search"> <InputBase placeholder="Search..." /></Link>
      <IconButton>
       <Link to ="/search"> <Search  /></Link>
      </IconButton>
    </FlexBetween>
  )}
</FlexBetween>

{/* DESKTOP NAV */}
{isNonMobileScreens ? (
  <FlexBetween gap="2rem">
    <IconButton onClick={() => dispatch(setMode())}>
      {theme.palette.mode === "dark" ? (
        <DarkMode sx={{ fontSize: "25px" }} />
      ) : (
        <LightMode sx={{ color: dark, fontSize: "25px" }} />
      )}
    </IconButton>
    <Message sx={{ fontSize: "25px" }} />
    <Notifications sx={{ fontSize: "25px" }} />
    <Help sx={{ fontSize: "25px" }} />
    <FormControl variant="standard" value={fullName}>
      <Select
        value={fullName}
        sx={{
          backgroundColor: neutralLight,
          width: "150px",
          borderRadius: "0.25rem",
          p: "0.25rem 1rem",
          "& .MuiSvgIcon-root": {
            pr: "0.25rem",
            width: "3rem",
          },
          "& .MuiSelect-select:focus": {
            backgroundColor: neutralLight,
          },
        }}
        input={<InputBase />}
      >
        <MenuItem value={fullName}>
          <Typography>{fullName}</Typography>
        </MenuItem>
        <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
      </Select>
    </FormControl>
  </FlexBetween>
) : (
  <IconButton
    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
  >
    <Menu />
  </IconButton>
)}

{/* MOBILE NAV */}
{!isNonMobileScreens && isMobileMenuToggled && (
  <Box
    position="fixed"
    right="0"
    bottom="0"
    height="100%"
    zIndex="10"
    maxWidth="500px"
    minWidth="300px"
    backgroundColor={background}
  >
    {/* CLOSE ICON */}
    <Box display="flex" justifyContent="flex-end" p="1rem">
      <IconButton
        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
      >
        <Close />
      </IconButton>
    </Box>

    {/* MENU ITEMS */}
    <FlexBetween
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="3rem"
    >
      <IconButton
        onClick={() => dispatch(setMode())}
        sx={{ fontSize: "25px" }}
      >
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: "25px" }} />
        )}
      </IconButton>
     <Link  to="/messages" > <Message sx={{ fontSize: "25px" }}  /></Link>
      <Notifications sx={{ fontSize: "25px" }} />
      <Help sx={{ fontSize: "25px" }} />
      <FormControl variant="standard" value={fullName}>
        <Select
          value={fullName}
          sx={{
            backgroundColor: neutralLight,
            width: "150px",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleLogout()}>
            Log Out
          </MenuItem>
        </Select>
      </FormControl>
    </FlexBetween>
  </Box>
)}
</FlexBetween>

          }

      </Box>

     
    );
  };

export default Navbar;
