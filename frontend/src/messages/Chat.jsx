import React from 'react'
import Sidebar from './Sidebar';
import MsgContainer from './MsgContainer';


const Chat = () => {
  
  return (
		<div class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-screen h-screen">
        <div className="absolute inset-0 backdrop-blur-md bg-opacity-50 bg-white mt-28">
        <div className='flex justify-center mt-10 sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 w-full'>
          <Sidebar></Sidebar>
          <MsgContainer></MsgContainer>
        </div>
      </div>
    </div>
  )
}

export default Chat
