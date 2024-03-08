import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
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



  return (
    <Router>
      <div  className='w-screen min-h-screen bg-customColor flex flex-col font-inte '>
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
            element={<Login setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
          <Route
            path="/signup"  
            element={<Signup setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser}/>}
          />
        </Routes>
      </div>
    </Router>
  );
}
