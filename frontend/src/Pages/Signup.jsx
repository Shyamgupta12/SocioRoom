import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai"
import Fox from "../models/Fox";
import Moder from '../components/Moder';
import { useState} from 'react'

import { toast } from 'react-toastify'
import { useNavigate,Link} from 'react-router-dom'
import axios from 'axios';




const Signup = ({setIsLoggedIn}) => {
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

function submitHandler(event){
   event.preventDefault();
   if(formData.password !== formData.confirmpassword){
    toast.error('Passwords do not match');
    return;
   }
   setIsLoggedIn(true);
   toast.success("Account Created");
   const accountData = {
    ...formData
   };

   const finalData = {
    ...accountData,
     
   }

   console.log("Printing Final account Data");
   console.log(finalData);

  //  NAVIGATE TO DASHBOARD 
  navigate("/"); 
}

function submitHandler(event) {
    event.preventDefault();
   
    setIsLoading(true);
    setCurrentAnimations('hit');
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
        navigate('/home');
      })
      .catch(error => {
        console.error('Error signing up:', error);
        toast.error('Error signing up. Please try again later.');
      });
  }
  


// const submitHandler = async(event)=>{
//    console.log('data :>>' ,formData);
//    event.preventDefault();
//    const res = await fetch(`http://localhost:3000/api/v1/usersignup`,{
//     method : 'POST',
//     headers:{
//       'Content-Type' : 'application/json'
//     },
//     body: JSON.stringify(formData)
//    })
//    const resData = await res.json()
//    console.log('resdata:>>',resData);
// }


  const [isLoading, setIsLoading] = useState(false);
  const[currentAnimation,setCurrentAnimations] = useState('idle')

  // const handleChange = ({target:{name,value}}) => {
  //   setForm({...form,[name]:value});
  // };
  const handleFoucs = () => setCurrentAnimations('walk');
  const handleBlur = () => setCurrentAnimations('idle');

  // const handleSubmit = (e) =>{
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setCurrentAnimations('hit');
  // }

  

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h2 className='head-text'>SignUp</h2>
        <form 
        onSubmit={submitHandler}
        className='w-50% flex flex-col gap-4 mt-10'>
          <div className='flex gap-7'>
            <label className='text-black-500 font-semibold flex-row'>
            <p className='text-[0.875rem]  mb-1 leading-[1.375rem]'>
              First Name<sup className='text-pink-500'>*</sup></p>
              <input
              required
                type='text'
                name='firstname'
                className='input'
                placeholder='Enter your firstname'
                onChange={changeHandler}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={formData.firstname}
              />
            </label>
            <label className='text-black-500 font-semibold flex-row'>
            <p className='text-[0.875rem]  mb-1 leading-[1.375rem]'>
              Last Name<sup className='text-pink-500'>*</sup></p>
              <input
              required
                type='text'
                name='lastname'
                className='input'
                placeholder='Enter your lastname'
                onChange={changeHandler}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={formData.lastname}
              />
            </label>
          </div>

          <label className='text-black-500 font-semibold'>
          <p className='text-[0.875rem]  mb-1 leading-[1.375rem]'>
             User Name<sup className='text-pink-500'>*</sup></p>
            <input
            required
              type='text'
              name='username'
              className='input'
              placeholder='Enter User Name'
              onChange={changeHandler}
              onFocus={handleFoucs}
              onBlur={handleBlur}
              value={formData.userName}
            />
          </label>
          <label className='text-black-500 font-semibold'>
          <p className='text-[0.875rem]  mb-1 leading-[1.375rem]'>
             Email<sup className='text-pink-500'>*</sup></p>
            <input
            required
              type='email'
              name='email'
              className='input'
              placeholder='Email'
              onChange={changeHandler}
              onFocus={handleFoucs}
              onBlur={handleBlur}
              value={formData.email}
            />
          </label>
          <div className='flex gap-10'>
            <label className='text-black-500 font-semibold'>
            <p className='text-[0.875rem]  mb-1 leading-[1.375rem]'>
              Password<sup className='text-pink-500'>*</sup></p>
              <input
              required
                type='password'
                name='password'
                className='input'
                placeholder='Password'
                onChange={changeHandler}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={formData.password}
              />
            </label>
            <label className='text-black-500 font-semibold'>
            <p className='text-[0.875rem]  mb-1 leading-[1.375rem]'>
              Confirm Password<sup className='text-pink-500'>*</sup></p>
              <input
              required
                type='password'
                name='confirmpassword'
                className='input'
                placeholder='Confirm password'
                onChange={changeHandler}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={formData.confirmpassword}
              />
            </label>
          </div>
          <div className='flex gap-3'>
            <label className='text-black-500 font-semibold'>
            <p className='text-[0.875rem]  mb-1 leading-[1.375rem]'>
             Gender<sup className='text-pink-500'>*</sup></p>
              <input
              required
                type='text'
                name='gender'
                className='input'
                placeholder='gender'
                onChange={changeHandler}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={formData.gender}
              />
            </label>
            <label className='text-black-500 font-semibold'>
            <p className='text-[0.875rem]  mb-1 leading-[1.375rem]'>
              Profession<sup className='text-pink-500'>*</sup></p>
              <input
              required
                type='text'
                name='profession'
                className='input'
                placeholder='Write your Profession'
                onChange={changeHandler}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={formData.profession}
              />
            </label>
          </div>
          <label className='text-black-500 font-semibold'>
          <p className='text-[0.875rem]  mb-1 leading-[1.375rem]'>
              Age<sup className='text-pink-500'>*</sup></p>
              <input
              required
                type='number'
                name='age'
                className='input'
                placeholder='Age'
                onChange={changeHandler}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={formData.age}
              />
            </label>
          <div className='display-col'>
            <button
              type='submit'
              className='btn mt-1'
              disabled={isLoading}
              onFocus={handleFoucs}
              onBlur={handleBlur}>
              {isLoading ? 'Submit...' : 'Submit '}
            </button>
          </div>
        </form>
      </div>
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            fov:75,
            near:0.1,
            far:1000,
            position:[0,0,5]
          }}>
          <directionalLight  intensity={2.5} position={[0,0,1]}/>
          <ambientLight intensity={0.5}/>
          <Suspense fallback={<Moder />}>
            <Fox 
             currentAnimation={currentAnimation}
             position={[0.5,0.35,0]}
             rotation={[12.65,-0.6,0]}
             scale={[0.5,0.5,0.5]}
           />
          </Suspense>
          
        </Canvas>
      </div>
    </section>
  );
};

export default Signup;
