import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Search from './components/Search'
import { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import Chat from './messages/Chat';
import VerifyOtp from './components/VerifyOtp';






export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser]=useState({})
  console.log(user)

  useEffect(()=>{
    const check=async() => {
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

  return (
    <Router>
      <div  className='w-screen min-h-screen  flex flex-col font-inte '>
        {/* <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  user={user} setUser={setUser}/> */}
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
            element={<Login setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
          <Route
            path="/signup"  
            element={<Signup setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
            <Route
            path="/search"  
            element={<Search setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
            <Route
            path="/messages"  
            element={<Chat setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />

         <Route
            path="/otp"  
            element={<VerifyOtp setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />


           

            
           

        </Routes>
      </div>
    
    </Router>
  );
}
