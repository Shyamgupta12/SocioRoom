import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import axios from 'axios';
import Fox from "../models/Fox";
import Moder from '../components/Moder';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';


const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle'); // Corrected typo

  function handleChange(event) {
    setFormData(prevData => ({
        ...prevData,
        [event.target.name]: event.target.value
    }));
}

  function handleSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:3000/api/v1/userlogin", formData)
        .then(response => {
            console.log('Login successful:', response.data);

            document.cookie = `token=${response.data.token}`
            localStorage.setItem("chat-user", JSON.stringify(response));
            console.log(response);
            setAuthUser(response);
            toast.success('LogIn Successful');
            setIsLoggedIn(true);
            
            navigate('/home'); // Redirect to the messages after successful login
        })
        .catch(error => {
            console.error('Error logging in:', error);
            toast.error('Error logging in. Please try again later.');
        });
  }
  


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
