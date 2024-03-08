import React from 'react'
import Template from '../components/Template'
// import LoginImg from "../components/assests/LoginImage.jpeg"

const Login = ({setIsLoggedIn }) => {
 return (
   <Template
   title="Welcome Back"
   desc1="Build skills for today,tomorow,and beyond."
   desc2="Education to future-proof your career."
//    image={LoginImg}
   formtype="login"
   setIsLoggedIn = {setIsLoggedIn}
   />
 )
}

export default Login
