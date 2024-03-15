import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import axios from 'axios';
import Fox from "../models/Fox";
import Moder from '../components/Moder';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle'); // Corrected typo

  const handleChange = event => {
    setFormData(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true); // Set loading state
    setCurrentAnimation('hit'); // Change animation while loading
  
    try {
      const response = await axios.post("http://localhost:3000/api/v1/userlogin", formData);
      console.log('Login successful:', response.data);
      toast.success('LogIn Successful');
  
      const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 1); // Set expiry date to 24 hours from now

// Set the token as a cookie with expiry time
document.cookie = `token=${response.data.token}; expires=${expiryDate.toUTCString()}; path=/`;

// Debugging logs
const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
const tokenFromCookie = tokenCookie ? tokenCookie.split('=')[1] : null;

console.log('Token from Cookie:', tokenFromCookie);
console.log('Response Token:', response.data.token);
console.log('Token Match:', tokenFromCookie === response.data.token);



  
      setIsLoggedIn(true);
      navigate('/home'); // Redirect to the messages after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Please try again later.');
      setIsLoading(false); // Reset loading state
    }
  };
  


  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  return (
    <div>
      <section className='relative flex lg:flex-row flex-col max-container'>
        <div className='flex-1 min-w-[50%] flex flex-col'>
          <h2 className='head-text'>Login</h2>
          <form
            onSubmit={handleSubmit}
            className='w-50% flex flex-col gap-4 mt-10'>
            <label className='text-black-500 font-semibold'>
              Email
              <input
                required
                type='email'
                name='email'
                className='input'
                placeholder='Email'
                onChange={handleChange}
                value={formData.email}
              />
            </label>
            <label className='text-black-500 font-semibold'>
              Password
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name='password'
                className='input'
                placeholder='Password'
                onChange={handleChange}
                value={formData.password}
              />
            </label>
            <div className='display-col'>
              <button
                required
                type='submit'
                className='btn mt-1'
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
        <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
          <Canvas
            camera={{
              fov: 75,
              near: 0.1,
              far: 1000,
              position: [0, 0, 5]
            }}>
            <directionalLight intensity={2.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Moder />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.65, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </div>
  );
};

export default Login;
