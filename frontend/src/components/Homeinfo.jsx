import React from 'react'
import { Link } from 'react-router-dom';
import {arrow } from "../assets/icons"

const InfoBox = ({ text,link,btnText }) => (
    <div className='info-box'>
    <p className='font-medium sm:text-xl text-center' >{text}</p>
    <Link to={link}  className='neo-brutalism-white neo-btn'>
        {btnText}
        <img src={arrow} className='w-4 h-4 obj'/>
    </Link>
</div>
)



const renderContent ={
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center 
        neo-brutalism-blue py-4 px-8 text-white mx-5'>
        "Ready to dive in?" 💪<br />
        <span className='font-semibold'> "Sign up" </span>
          "and let's get social!" </h1>
    ),
    2 : (
        <InfoBox 
        text="Let's get social! "
        link="/Signup"
        btnText="Sign  " />
    ),
    3 : (
        <InfoBox 
        text="Ready to jump back in?"
        link="/Signup"
        btnText="LOGIN " />
    ),

}

const Homeinfo = ({currentStage}) => {
  return renderContent[currentStage] || null;
}

export default Homeinfo
