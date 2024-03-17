import { MenuItem , Menu ,Avatar , Badge ,  Box , AppBar, Toolbar , styled , Typography, InputBase} from '@mui/material'
import { Mail, Notifications  } from "@mui/icons-material";
import React, { useState , useEffect} from 'react'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { toast } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Searchbar from './SearchBar';
import useLogout from '../hooks/useLogout';
import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from "../context/AuthContext";


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "50px",
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = ({ setUser, user, setFlag, flag, isLoggedIn, setIsLoggedIn }) => {
  // Frontend code
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [open , setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [navuser, setNavuser] = useState({});
  const {loading ,logout} = useLogout();

  useEffect(() => {
    const check = async () => {
      try {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setNavuser(foundUser);
          await setUser(foundUser);
        }
      } catch (err) {
        console.log(err);
      }
    };
    check();
  }, [user?._id, flag]);

    // Check if authUser exists before accessing its properties
    if (!authUser) {
        return null; // or return a loading indicator or redirect to login
    }

//   const fetchData = (value) => {
//     fetch("http://localhost:3000/api/v1/getusernames")
//       .then((response) => response.json())
//       .then((json) => {
//           if (Array.isArray(json)) {
//               const results = json.filter((user) => {
//                   return value && user && user.usernames && user.usernames.toLowerCase().includes(value);
//               });
//               console.log(results);
//           } else {
//               console.error("JSON response is not an array.");
//           }
//       })
//       .catch((error) => {
//           console.error("Error fetching data:", error);
//       });
// }




  // const handleChange = (value) => {
  //   setInput(value);
  //   fetchData(value);
  // }


//   const Logout = async () => {
//     try {
//           const getCookie = (name) => {
//             const value = `; ${document.cookie}`;
//             const parts = value.split(`; ${name}=`);
//             if (parts.length === 2) return parts.pop().split(';').shift();
//           }
        
//         const token = getCookie('token');

//         const response = await fetch("http://localhost:3000/api/v1/logout", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorisation': `Bearer ${token}`,
//             },
//         });

//         console.log(response);

//         if (response.ok) {
//             // Clear token from local storage
//             // document.cookie=null;
//             document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//             console.log(document.cookie)
//             // Update login state
//             setIsLoggedIn(false);
//             // Notify the user
//             toast.success('Logout successful');
           
//            navigate("/") // Redirect to the "/" after successful login
//         } else {
//             // If response is not ok, throw an error
//             throw new Error('Logout failed');
//         }
//     } catch (error) {
//         console.error('Logout error:', error);
//         toast.error('Logout failed');
//     }
// };


  return (
    <div className='static'>
 {/* not logged nav bar */}
{!isLoggedIn && 
  <header className='header flex '>
        <NavLink to="/" className="w-40 h-10 rounded-lg bg-white items-center 
        justify-center flex font-bold shadow-md">
            <p className=''>SOCIOROOM</p>
        </NavLink>
        <nav className='flex text-lg gap-7 font-medium' >
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


 {/* logged in navbar */}
    { isLoggedIn && 

<AppBar position='sticky' >
<StyledToolbar>
<NavLink to={"/home"}><Typography variant='h6'  sx={{ display: { xs: "none", sm: "block" } }}>SOCIOROOM</Typography></NavLink>
  <ConnectWithoutContactIcon   sx={{ display: { xs: "block", sm: "none" } }} />
  <Searchbar />
 <Icons>
       <Badge badgeContent={authUser.data.loginUser.followings.length} color="error">
      <NavLink to={"/messages"}> <Mail /></NavLink>
     </Badge>
     <Badge badgeContent={2} color="error">
       <Notifications />
     </Badge>
     <Avatar
        sx={{ width: 30, height: 30 }}
        src={authUser.data.loginUser.image} // Remove the ${} and use the variable directly
        onClick={(e) => setOpen(true)}
      />
 </Icons>
 <UserBox onClick={(e) => setOpen(true)}>
   <Avatar
       sx={{ width: 30, height: 30 }}
       src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
       
   />
   <Typography variant="span">John</Typography>
 </UserBox>
</StyledToolbar>
<Menu
   id="demo-positioned-menu"
   aria-labelledby="demo-positioned-button"
   open={open}
   onClose={(e) => setOpen(false)}
   anchorOrigin={{
     vertical: "top",
     horizontal: "right",
   }}
   transformOrigin={{
     vertical: "top",
     horizontal: "right",
   }}
 > 
   <MenuItem>Profile</MenuItem>
   <MenuItem>My account</MenuItem>
   <MenuItem onClick={logout}>Logout</MenuItem>
</Menu>
</AppBar>

    }


    </div>
  
  )
}

export default Navbar