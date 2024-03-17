import React from 'react'
import Sidebar from './Sidebar';
import MsgContainer from './MsgContainer';

const Chat = () => {
  return (
		<div className='flex justify-center sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <Sidebar></Sidebar>
        <MsgContainer></MsgContainer>
    </div>
  )
}

export default Chat
