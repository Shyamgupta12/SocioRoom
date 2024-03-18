import React from 'react'
import Sidebar from './Sidebar';
import MsgContainer from './MsgContainer';


const Chat = () => {
  
  return (
		<div className="bg-black h-screen flex justify-center items-center">
        <div className="absolute inset-0 backdrop-blur-md bg-opacity-40 bg-white mt-28">
        <div className='flex justify-center mt-10 sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 w-full'>
          <Sidebar></Sidebar>
          <MsgContainer></MsgContainer>
        </div>
      </div>
    </div>
  )
}

export default Chat
