import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function changeHandler(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    function submitHandler(event) {
        event.preventDefault();

        axios.post("http://localhost:3000/api/v1/userlogin", formData)
            .then(response => {
                console.log('Login successful:', response.data);

                document.cookie = `token=${response.data.token}`
                toast.success('LogIn Successful');
                setIsLoggedIn(true);
                
                navigate('/messages'); // Redirect to the messages after successful login
            })
            .catch(error => {
                console.error('Error logging in:', error);
                toast.error('Error logging in. Please try again later.');
            });
    }
    // if(response.data === 400){
    //     toast.error('Invalid Credentials');
    //    }
    //    else{
    //     const resData = await resizeBy.json();
    //     if(resData.token){
    //         localStorage.setItem('uesr:token',resData.token)
    //         localStorage.setItem('uesr:detail',JSON.stringify(resData.user)
    //         navigate('/');
    //     }
    //    }

    return (
        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
            <label className='w-full'>
                <p className='text-[0.875rem] text-gray-300 mb-1 leading-[1.375rem]'>
                    Email Address<sup className='text-pink-500'>*</sup>
                </p>
                <input
                    required
                    type='email'
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter email address'
                    name='email'
                    className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-gray-300 mb-1 leading-[1.375rem]'>
                    Password<sup className='text-pink-500'>*</sup>
                </p>
                <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='Enter Password'
                    name='password'
                    className='bg-gray-800 rounded-[0.5rem] text-gray-300 w-full h-8 p-[12px]'
                />
                {/* onclick se prev ki value opposite ho jayengi agar true h to false or false h to true */}
                <span className='absolute right-3 top-[29px] cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={22} fill='#AFB2BF' />
                    ) : (
                        <AiOutlineEye fontSize={22} fill='#AFB2BF' />
                    )}
                </span>
                <Link to="#">
                    <p className='text-xs mt-1 text-blue-300 max-w-max ml-auto'>Forgot Password</p>
                </Link>
            </label>

            <button className='bg-yellow-400 rounded-[8px] font-medium text-gray-900 px-[8px] py-[5px] mt-4'>
                Sign In
            </button>
        </form>
    );
}

export default LoginForm;
