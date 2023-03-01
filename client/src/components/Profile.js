import React from 'react'
import Clip from './Clip'
import Post from './Post'

export default function Profile() {
    return (
        <div>
            <div className="flex flex-row h-screen text-white">
                
                <div className="flex flex-nowrap border-red-500 flex-col w-2/5 h-screen py-3 px-3  ">
                    <div className="mb-2 font-semibold rounded-lg text-lg items-center p-3 border border-red-500">Name: <span className="text-red-500">Dhinakar</span></div>
                   
                    
                    <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-red-500 border">UserName: <span className="text-red-500"></span><p></p></div>
                    <div className="w-64 mb-2 object-fill font-semibold text-lg rounded-lg p-3  border-red-500 items-center"></div>
                    <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-red-500 border">BIO: <Clip/> <span className="text-red-500"></span><p></p></div>
                    
                    <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-red-500 border">Email: <span className="text-red-500">codedhinakarr@gmail.com</span></div>
                    <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-red-500 border">website: <span className="text-red-500"><a target="_blank"> dhinakarr.in</a></span></div>
                </div>

                <div className="lex flex-nowrap flex-col h-screen w-3/5 py-9 px-5 border-red-500 ">
                    <button className="font-semibold  hover:bg-rose-500 w-40 h-10 py-1 mb-10 text-center border">Go Back</button>
                    <button className="font-semibold  hover:bg-rose-500 w-40 h-10 py-1 mb-10 ml-2 text-center border">Edit Profile</button>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />

                </div>

               



            </div>
        </div>
    )
}
