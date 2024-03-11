import React from 'react';
import Avatar from '../assests/avatar.jpg';
import { MdAddIcCall } from 'react-icons/md';
import { IoSendSharp } from "react-icons/io5";
import { BiPlusCircle } from "react-icons/bi";
import { useState,useEffect } from 'react';

const Chat = () => {
    const contacts = [
        {
            name: 'Akhil',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'anmol',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'shyam',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'champa',
            status: 'Available',
            img: Avatar
        }
    ];

    useEffect(() =>{
        const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
        const fetchConversations = async()=>{
            const res = await fetch(`http://localhost:3000/api/conversation/${loggedInUser?.id}` ,{
                method:'GET',
                headers:{
                    'Content-Type' : 'application/json',
                },
            })
        }
    },[])

     const [user,setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
       console.log('user :>>' , user);
    const [conversations,setConversations] = useState([]);



    return (
        <div className="w-screen flex">
            <div className="w-[25%] border border-gray-800 h-screen">
                <div className="flex justify-center items-center my-8">
                    <div className="border border-primary p-[2px] rounded-full">
                        <img src={Avatar} alt="avatar" width={75} height={75} />
                    </div>
                    <div className="ml-4 text-white">
                        <h3 className="text-2xl">hlw </h3>
                        <p className="text-lg font-light">My Account</p>
                    </div>
                </div>
                <hr />
                <div className="mx-10 mt-5">
                    <div className="text-blue-600 text-lg">Messages</div>
                    <div>
                        {contacts.map(({ name, status, img }, index) => (
                            <div key={index} className="flex justify-center items-center py-8 border-b border-gray-600">
                                <div className="cursor-pointer flex items-center">
                                    <div className="border border-primary p-[2px] rounded-full">
                                        <img src={img} alt="contact" width={30} height={30} />
                                    </div>
                                    <div className="ml-3 text-white">
                                        <h3 className="text-lg font-semibold">{name}</h3>
                                        <p className="text-sm font-light">{status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-[50%] border border-gray-800 h-screen flex-col items-center">
                <div className="w-[75%] bg-gray-600 h-[80px] my-14 rounded-full flex items-center px-14 ">
                    <div className="cursor-pointer">
                        <img src={Avatar} alt="avatar" width={60} height={60} />
                    </div>
                    <div className="ml-6 mr-auto">
                        <h3 className="text-lg">Sumit</h3>
                        <p className="text-sm font-light text-gray-600">Online</p>
                    </div>
                    <div className="cursor-pointer text-white text-2xl">
                        <MdAddIcCall />
                    </div>
                </div>

                <div className="h-full  w-full overflow-scroll shadow-lg">
                    <div className=" p-14">
                        <div className=' max-w-[40%] bg-gray-400 rounded-b-xl rounded-tr-xl p-2 mb-6'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                              
                        </div>
                        <div className=' max-w-[40%] bg-gray-700 rounded-b-xl rounded-tl-xl ml-auto p-2 text-white mb-6 '>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </div>
                        <div className=' max-w-[40%] bg-gray-400 rounded-b-xl rounded-tr-xl p-2 mb-6'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                              
                        </div>
                        <div className=' max-w-[40%] bg-gray-700 rounded-b-xl rounded-tl-xl ml-auto p-2 text-white mb-6 '>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </div>
                        <div className=' max-w-[40%] bg-gray-400 rounded-b-xl rounded-tr-xl p-2 mb-6'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                              
                        </div>
                        <div className=' max-w-[40%] bg-gray-700 rounded-b-xl rounded-tl-xl ml-auto p-2 text-white mb-6 '>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </div>
                    </div>
                </div>
                <div className='p-14 w-full flex items-center '>
                    <input placeholder = 'type a message....' className='w-[75%] p-2  border-0 shadow-lg rounded-full bg-light focus:ring-0 focus:border-0 outline-none '  />
                            <div className='ml-4 p-4 cursor-pointer bg-light rounded-full'><IoSendSharp /></div>
                            <div  className='ml-4 p-4 cursor-pointer bg-light rounded-full'><BiPlusCircle /></div>
          </div>
            </div>

         

            <div className="w-[50%] border border-gray-800 h-screen"></div>
        </div>
    );
};

export default Chat;
