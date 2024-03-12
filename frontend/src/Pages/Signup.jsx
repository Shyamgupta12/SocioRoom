import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import Fox from "../models/Fox";
import Moder from '../components/Moder';


const Signup = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    userName: '',
    email: '',
    password: '',
    confirmpassword: '',
    gender: '',
    age: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const[currentAnimation,setCurrentAnimations] = useState('idle')

  const handleChange = ({target:{name,value}}) => {
    setForm({...form,[name]:value});
  };
  const handleFoucs = () => setCurrentAnimations('walk');
  const handleBlur = () => setCurrentAnimations('idle');

  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimations('hit');
  }

  

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h2 className='head-text'>SignUp</h2>
        <form 
        onSubmit={handleSubmit}
        className='w-50% flex flex-col gap-4 mt-10'>
          <div className='flex gap-7'>
            <label className='text-black-500 font-semibold flex-row'>
              First Name
              <input
                type='text'
                name='firstname'
                className='input'
                placeholder='Enter your firstname'
                onChange={handleChange}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={form.firstname}
              />
            </label>
            <label className='text-black-500 font-semibold flex-row'>
              Last Name
              <input
                type='text'
                name='lastname'
                className='input'
                placeholder='Enter your lastname'
                onChange={handleChange}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={form.lastname}
              />
            </label>
          </div>

          <label className='text-black-500 font-semibold'>
            User Name
            <input
              type='text'
              name='username'
              className='input'
              placeholder='Enter User Name'
              onChange={handleChange}
              onFocus={handleFoucs}
              onBlur={handleBlur}
              value={form.userName}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='email'
              name='email'
              className='input'
              placeholder='Email'
              onChange={handleChange}
              onFocus={handleFoucs}
              onBlur={handleBlur}
              value={form.email}
            />
          </label>
          <div className='flex gap-10'>
            <label className='text-black-500 font-semibold'>
              Password
              <input
                type='password'
                name='password'
                className='input'
                placeholder='Password'
                onChange={handleChange}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={form.password}
              />
            </label>
            <label className='text-black-500 font-semibold'>
              ConfirmPassword
              <input
                type='password'
                name='confirmpassword'
                className='input'
                placeholder='Confirm password'
                onChange={handleChange}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={form.confirmpassword}
              />
            </label>
          </div>
          <div className='flex gap-3'>
            <label className='text-black-500 font-semibold'>
              Gender
              <input
                type='text'
                name='gender'
                className='input'
                placeholder='gender'
                onChange={handleChange}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={form.gender}
              />
            </label>
            <label className='text-black-500 font-semibold'>
              Age
              <input
                type='number'
                name='age'
                className='input'
                placeholder='Age'
                onChange={handleChange}
                onFocus={handleFoucs}
                onBlur={handleBlur}
                value={form.age}
              />
            </label>
          </div>
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
