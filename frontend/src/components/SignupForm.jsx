import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useNavigate , useHistory } from 'react-router-dom';
import axios from 'axios';

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    gender: '',
    profession: '',
    age: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  
    const accountData = { ...formData };
  
    const PostData = async (e) => {
      e.preventDefault();
      const {
        firstname,
        lastname,
        username,
        email,
        password,
        confirmpassword,
        gender,
        profession,
        age
      } = accountData;
    
      try {
        const res = await fetch("/api/v1/usersignup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstname,
            lastname,
            username,
            email,
            password,
            confirmpassword,
            gender,
            profession,
            age
          })
        });
    
        if (res.ok) {
          window.alert("Registration Successfully.");
          console.log("Registration Successfully.");
        } else {
          const data = await res.json();
          window.alert("Invalid Registration: " + data.message);
          console.log("Invalid Registration: ", data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        window.alert("Error during registration. Please try again.");
      }
    };
    
    

  return (
    <div >
         {/* student-Instructor tab */}

       <form method='POST'> 

         {/* first name and lastname */}
       <div className='flex  gap-x-4 mt-2'>

        
       <label className='w-full mt-2'>
            <p className='text-[0.875rem] text-gray-300 mb-1 leading-[1.375rem]'>
              First Name<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder='Enter first Name'
              value={formData.firstName}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
           />
          </label>

           
          <label className='w-full mt-2'>
            <p className='text-[0.875rem] text-gray-300 mb-1 leading-[1.375rem]'>
              Last Name<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder='Enter last Name'
              value={formData.lastName}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
           />
          </label>

       </div>

       {/* username */}
         
       <label className='w-full mt-auto'>
            <p className='text-[0.875rem] text-gray-300 mb-1 mt-2 leading-[1.375rem]'>
              UserName<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type="text"
              name="username"
              onChange={changeHandler}
              placeholder='Enter UserName'
              value={formData.username}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
           />
          </label>



         {/* email address */}
       <label className='w-full mt-auto'>
            <p className='text-[0.875rem] text-gray-300 mb-1 mt-2 leading-[1.375rem]'>
              Email Address<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder='Enter Email Address'
              value={formData.email}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
           />
          </label>
        

          {/* create password and confitm password */}

        <div className='flex  gap-x-4 mt-2'>
            
        <label className='w-full relative '>
            <p className='text-[0.875rem] text-gray-300 mb-1 leading-[1.375rem]'>
              Create Password<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type= {showPassword ? ("text") : ("password")}
              name="password"
              onChange={changeHandler}
              placeholder='Enter password'
              value={formData.password}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
           />

                {/* onclick se prev ki value opposite ho jayengi agar true h to false or false h to true */}
       <span 
        className='absolute right-3 top-[29px] cursor-pointer'
       onClick={() => setShowPassword((prev) => !prev)}>  
         {showPassword ? 
         (<AiOutlineEyeInvisible fontSize={22} fill='#AFB2BF' />) 

         : <AiOutlineEye fontSize={22} fill='#AFB2BF' />}

       </span>

          </label> 


          <label className='w-full relative '>
            <p className='text-[0.875rem] text-gray-300 mb-1 leading-[1.375rem]'>
              Confirm Password<sup className='text-pink-500'> *</sup></p>
           < input
              required
              type= {showConfirmPassword ? ("text") : ("password")}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]' 
           />

         


                {/* onclick se prev ki value opposite ho jayengi agar true h to false or false h to true */}
       <span 
       className='absolute right-3 top-[30px] cursor-pointer'
       onClick={() => setshowConfirmPassword((prev) => !prev)}>  
         {showConfirmPassword ? 
         
         (<AiOutlineEyeInvisible fontSize={22} fill='#AFB2BF'/>) 
         
         : <AiOutlineEye  fontSize={22} fill='#AFB2BF'/>}

       </span>

          </label> 

          

        </div>

          {/* Gender and proffession */}
          <div className='flex  gap-x-4 mt-2'>
              {/* Gender */}
           
          <label className='w-full mt-auto'>
            <p className='text-[0.875rem] text-gray-300 mb-1 mt-2 leading-[1.375rem]'>
             Gender<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type="text"
              name="gender"
              onChange={changeHandler}
              placeholder='Enter gender'
              value={formData.gender}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
           />
          </label>

          {/* Proffession */}
        
          <label className='w-full mt-auto'>
            <p className='text-[0.875rem] text-gray-300 mb-1 mt-2 leading-[1.375rem]'>
             Proffesion<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type="text"
              name="profession"
              onChange={changeHandler}
              placeholder='Enter Your Proffession'
              value={formData.profession}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
           />
          </label>
        </div>

              {/* Age */}

              <label className='w-full mt-auto'>
            <p className='text-[0.875rem] text-gray-300 mb-1 mt-2 leading-[1.375rem]'>
              Age<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type="number"
              name="age"
              onChange={changeHandler}
              placeholder='Enter Your Age'
              value={formData.age}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
           />
          </label>

        <button onClick={PostData} className='w-full bg-yellow-400 rounded-[8px] font-medium text-gray-900 px-[8px] py-[5px] mt-4'>
            Create Account
        </button>

       </form>

    </div>
  )
}

export default SignupForm