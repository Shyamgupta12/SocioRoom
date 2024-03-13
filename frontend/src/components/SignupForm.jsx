import React from 'react'
import { useState} from 'react'
import { AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai"
import { toast } from 'react-toastify'
import { useNavigate,Link} from 'react-router-dom'
import axios from 'axios';


const SignupForm = ({setIsLoggedIn}) => {

  const navigate = useNavigate();

 const [formData,setFormData] = useState({
   firstname:"",
   lastname:"",
   username:"",
   email:"",
   password:"",
   confirmpassword:"",
   gender:"",
   profession:"",
   age:"",
   
  
 })

 const[showPassword , setShowPassword] = useState(false);
 const[showConfirmPassword , setshowConfirmPassword] = useState(false);


 function changeHandler(event){

  setFormData((prevData)  =>(
      {
          ...prevData,
          [event.target.name]:event.target.value


      }

  ));

}

// function submitHandler(event){
//    event.preventDefault();
//    if(formData.password !== formData.confirmPassword){
//     toast.error('Passwords do not match');
//     return;
//    }
//    setIsLoggedIn(true);
//    toast.success("Account Created");
//    const accountData = {
//     ...formData
//    };

//    const finalData = {
//     ...accountData,
     
//    }

//    console.log("Printing Final account Data");
//    console.log(finalData);

//   //  NAVIGATE TO DASHBOARD 
//   navigate("/"); 
// }

function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    const accountData = { ...formData };
    axios.post("http://localhost:3000/api/v1/usersignup", accountData)
      .then(response => {
        console.log('Signup successful:', response.data);
        setIsLoggedIn(true);
        toast.success('Account Created');
        navigate('/');
      })
      .catch(error => {
        console.error('Error signing up:', error);
        toast.error('Error signing up. Please try again later.');
      });
  }
  


// const submitHandler = async(event)=>{
//    console.log('data :>>' ,formData);
//    event.preventDefault();
//    const res = await fetch(http://localhost:3000/api/v1/usersignup,{
//     method : 'POST',
//     headers:{
//       'Content-Type' : 'application/json'
//     },
//     body: JSON.stringify(formData)
//    })
//    const resData = await res.json()
//    console.log('resdata:>>',resData);
// }


  return (
    <div >
         {/* student-Instructor tab */}

       <form onSubmit={submitHandler}> 

         {/* first name and lastname */}
       <div className='flex  gap-x-4 mt-2'>

        
       <label className='w-full mt-2'>
            <p className='text-[0.875rem] text-gray-300 mb-1 leading-[1.375rem]'>
              First Name<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type="text"
              name="firstname"
              onChange={changeHandler}
              placeholder='Enter first Name'
              value={formData.firstname}
              className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
           />
          </label>

           
          <label className='w-full mt-2'>
            <p className='text-[0.875rem] text-gray-300 mb-1 leading-[1.375rem]'>
              Last Name<sup className='text-pink-500'>*</sup></p>
           < input
              required
              type="text"
              name="lastname"
              onChange={changeHandler}
              placeholder='Enter last Name'
              value={formData.lastname}
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
              name="confirmpassword"
              onChange={changeHandler}
              placeholder='Confirm Password'
              value={formData.confirmpassword}
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

        <button className='w-full bg-yellow-400 rounded-[8px] font-medium text-gray-900 px-[8px] py-[5px] mt-4'>
            Create Account
        </button>

       <div>
        <span className='text-teal-600 '>Already Have an Account ? <Link to="/login" className="text-orange-600 cursor-pointer underline">Log In</Link> </span>
       </div>
       </form>

    </div>
  )
}

export default SignupForm