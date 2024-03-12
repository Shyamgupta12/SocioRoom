
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './Search';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { NavLink } from 'react-router-dom'




const Navbar = ({  setUser, user, setFlag, flag, isLoggedIn, setIsLoggedIn }) => {
 
    const [navuser, setNavuser] = useState({});

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
  
    const handleLogout = () => {
      localStorage.clear();
      setIsLoggedIn(false);
      toast.success("Logged Out");
    };  

    return (
      <div>

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

          {isLoggedIn &&
            <div className='bg-slate-800 border-b-[1px] border-b-slate-300'>
      <div  className='flex justify-between w-11/12 items-center py-1 mx-auto'>

    
        <nav className='flex items-center space-x-[50px]'>
          {!isLoggedIn && 
            <ul className='text-gray-300 text-xl trxt-2xl font-semibold  flex gap-x-6 '>
              <li>
                <Link to="/"></Link>
              </li>
             
            </ul>
          }
          {isLoggedIn &&
            <ul className='text-gray-300 trxt-2xl text-2xl font-semibold  flex gap-x-6 '>
                <li>
                <Link to="/home" >Home</Link>
              </li>
            </ul>
          }
          
          {isLoggedIn && ( 
           
            <Search />
          )}
          <Link to="/notifications">{< CircleNotificationsIcon />}</Link>
          
          {/* // messages */}
           {isLoggedIn &&
            <ul className='text-gray-300 trxt-2xl text-2xl font-semibold  flex gap-x-6 '>
                <li>
                <Link to="/messages">{< ChatBubbleIcon />}</Link>
              </li>
            </ul>
          }

            
        </nav>

     


        <div className='flex items-center gap-x-4 '>

          {!isLoggedIn &&
            <Link to="/login">
              <button className='bg-slate-900 text-gray-300 py-[8px] px-[12px] rounded-[8px] border border-Fuchsia-700'>
                Log In
              </button>
            </Link>
          }
          {!isLoggedIn &&
            <Link to="/signup">
              <button className='bg-slate-900 text-gray-300 py-[8px] px-[12px] rounded-[8px] border border-Fuchsia-700'>
                Sign up
              </button>
            </Link>
          }
          {isLoggedIn &&
            <Link to="/">
              <button onClick={ () => {
            setIsLoggedIn(false);
            toast.success("Logged Out");
          }} className='bg-teal-700 text-red-700 hover:text-blue-700npm py-[8px] px-[12px] rounded-[8px] border border-Fuchsia-700'>
              Log Out
            </button>
            </Link>
          }
          {/* {isLoggedIn &&
            <Link to="/">
              <button className='bg-teal-700 text-gray-300 py-[8px] px-[12px] rounded-[8px] border border-Fuchsia-700'>
                Dashboard
              </button>
            </Link>
          } */}
           {/* <div className="inside2 font-bold text-white hover:cursor-pointer " onClick={toggle} >Theme Toggle</div> */}
        </div>

      </div>
    </div>
          }
      </div>
    
  )
}

export default Navbar
