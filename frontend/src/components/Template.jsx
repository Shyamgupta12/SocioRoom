import React from 'react'
// import frameImage from "../assests/Frame.jpg.png"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
// import {FcGoogle} from 'react-icons/fc'



const Template = ({title,desc1,desc2,formtype,setIsLoggedIn}) => {
  return ( 
    <div className='flex justify-between w-11/12  max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0' >
      
     <div className='w-11/12 max-w-[450px]'>
        <h1
        className='text-gray-300 font-semibold text-[1.875rem] leading-[2.375rem]'
        >{title}</h1>
        {/* <p className='text=[1.125rem] leading[1.625rem] mt-4'>
            <span className='text-gray-300'>{desc1}</span>
            <br/>
                <span className='text-blue-600 italic'>{desc2}</span>
        </p> */}

      {formtype === "signup" ? 
      (<SignupForm  setIsLoggedIn={setIsLoggedIn}/>):
      (<LoginForm  setIsLoggedIn={setIsLoggedIn } />)}

       {/* <div className='flex w-full items-center my-4 gap-x-2'>
        <div className='h-[1px] w-full bg-teal-500'></div>
        <p className='text-teal-500 font-medium leading[1.375rem]'>
          OR
          </p>
        <div className='h-[1px] w-full bg-teal-500'></div>
       </div> */}

      {/* <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-gray-100
      border border-zinc-700 px-[12px] py-[8px] gap-x-2 mt-4 '>
        <FcGoogle/>
        <p>Sign Up with Google </p>
      </button> */}

     </div>
      

      {/* IMAGE SECTION */}

     {/* <div className='relative w-11/12 max-w-[350px] '>
     
     <img src={frameImage} 
     alt='Pattern'
     width={330} height={370} loading='lazy'
     />
     
     <img src={image} 
     alt='Students'
     width={310} height={290} loading='lazy'
     className='absolute -top-4 right-4'
     />

     </div> */}

    </div>
  )
}

export default Template 
