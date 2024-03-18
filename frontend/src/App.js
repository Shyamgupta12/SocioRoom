import { BrowserRouter as Router, Route, Routes, redirect ,Switch, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import Chat from './messages/Chat';
import MyProfile from './Pages/MyProfile';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoggedHome from './components/LoggedHome';
import Search from './components/Search';
import MyPosts from  './Pages/MyPosts'
import './index.css';
import { useAuthContext } from './context/AuthContext';
import Follower from './Pages/Follower';
import Following from './Pages/Following';


export default function App() {
// theme seeting dark or light
// const mode = useSelector((state) => state.mode);
// const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
// const isAuth = Boolean(useSelector((state) => state.token));
const { authUser } = useAuthContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser]=useState({})
  console.log(user)

  useEffect(()=>{
    const check=async()=>{
      try{
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          console.log(loggedInUser);
          const foundUser = JSON.parse(loggedInUser);
          console.log("found user",foundUser  )
          await setUser(foundUser);
        }
      }catch(err){
        console.log(err)
      }
    }
    check()
  },[user._id])

// const ProtectRoutes = ({children}) => {
//   const isLoggedIn = localStorage.getItem('user:token') != null

//   if(!isLoggedIn) redirect('/users/signup')
//   return children
// }


   // bg-customColor
  return (
    <Router>
        {/* <Switch> */}
      <div  className='w-screen min-h-screen  flex flex-col font-inte '>   
      {/* <ThemeProvider theme={theme}> */}
        <CssBaseline/>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  user={user} setUser={setUser}/>
        <Routes>
          <Route
            path="/"
            element={<Home setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />}
          />
          <Route  path="/" element={
             <PrivateRoute isLoggedIn={isLoggedIn} user={user} setUser={setUser}>
             <Home
                element={<Home user={user} setUser={setUser}/>}   /> 
            </PrivateRoute>
          } />
          <Route
            path="/login"  
            element={<Login element={authUser ? <Navigate to='/' />: <Login />} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
          <Route
            path="/signup"  
            element={<Signup element={authUser ? <Navigate to='/' />: <Signup />} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
             <Route
            path="/myposts"  
            element={<MyPosts setIsLoggedIn={setIsLoggedIn} />}
          />
            <Route
            path="/search"  
            element={<Search setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
            <Route
            path="/messages"  
            element={<Chat element={authUser ? <Navigate to='/' />: <Login />} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
            <Route
            path="/myprofile"  
            element={<MyProfile setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
            <Route
            path="/follower"  
            element={<Follower setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
           <Route
            path="/following"  
            element={<Following setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
           <Route
            path="/home"  
            element={<LoggedHome setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />

          

        </Routes>
      {/* </ThemeProvider> */}
        
      </div>
      {/* </Switch> */}
    </Router>
    
  );
}