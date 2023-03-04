import React from 'react'
import AudioRecorder from './RecordView2';
import axios from 'axios';
import Post from './Post';
import { useState, useEffect } from 'react';



export default function Feed() {

    let libs =[];

    const[audio,setAudio]= useState([])
    const[user,setUser] = useState([])
    const [x, setX] = useState(false)

 function OnChangeHandler(e){
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
        // let data = await axios.get(`/api/user/userSearchDetails?searchUser=${user}`)
        // console.log(data)
    }

//User Search function.
 async function onSubmitHandler(e){
    try {
        
    } catch (error) {
        
    }
 }



    useEffect(() => {
        
        let token = localStorage.getItem("token");
        console.log(token)
        if (token) {
            token = JSON.parse(token);
        }

        else {
            // navigate("/")
        }

        let getAudio = async () => {

            try {

                let ls = localStorage.getItem("token");
                ls = JSON.parse(ls)

                const config = {
                    headers: {
                        "auth-token": ls
                    }
                };

                let { data } = await axios.get("/api/audio/viewAll", config);
                setAudio(data.x);
                console.log(data.x);
            } catch (error) {
                console.error(error.response.data);
            }
        }


        getAudio();
    }
    , [audio])

    audio.reverse();

    audio.forEach(async (ele) => {
        libs.push(
            <Post audio={ele} user={ele.producedBy}  />
        )
    })

    function onNewPostClick() {
        if (x) {
            setX(false)
        }
        if (!x) { setX(true) }
    }

    return (
        <div className='bg-black'>
            <div className="flex justify-center w-screen h-screen px-4 text-white">

                <div className="flex w-full max-w-screen-lg">
                    {/* Navbar */}
                    <div className="flex flex-col  py-4 pr-3 text-rose-700">
                        <a
                            className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300"
                            href="#"
                        >

                            Home
                        </a>


                        <a
                            className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300"
                            href="#"
                        >
                            Converse
                        </a>
                        <a
                            className="flex px-3 py-2 mt-auto text-lg rounded-sm font-medium hover:bg-gray-200"
                            href="#"
                        >
                            <span className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full" />
                            <div className="flex flex-col ml-2">
                                <span className="mt-1 text-sm font-semibold leading-none">
                                    Username
                                </span>
                                <span className="mt-1 text-xs leading-none">@username</span>
                            </div>
                        </a>
                    </div>


                    <div className="flex flex-col flex-grow w-2/3 border-l border-r border-rose-700">


                        <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-rose-700">
                            <h1 className="text-xl font-semibold ">How's life ?</h1>
                        </div>

                        <div className="flex-grow h-0 overflow-auto">
                           
                            <button onClick={onNewPostClick} className='text border-2 border-red-700 p-3 font-semibold ml-10 mt-5 text-white'> {x ? "Don't Post" : "New Post"}</button>
                            <p className='m-5'>There's no pause option, you can only stop and post.<br/> It'll be spontaneous that way, you can click don't post if you wish to not post anything.</p>
                            <div className="flex w-full p-8 border-b-2 border-rose-700">

                                <div className="flex  flex-grow ml-4">

                                    {x ? <AudioRecorder /> : ""}

                                </div>

                            </div>

                            {libs}

                        </div>
                    </div>


                    <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">

                        <input
                            onChange={OnChangeHandler}
                            name='search'
                            className="flex placeholder-red-700 text-black items-center h-8 px-2 border border-gray-500 rounded-sm"
                            type="search"
                            placeholder="Search…"
                        />
                   
                        {/* <div>
                            <h3 className="mt-6 font-semibold">Trending</h3>
                            <div className="flex w-full py-4 border-b border-rose-700">
                                <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
                                <div className="flex flex-col flex-grow ml-2">
                                    <div className="flex text-sm">
                                        <span className="font-semibold">Username</span>
                                        <span className="ml-1">@username</span>
                                    </div>
                                    <p className="mt-1 text-sm">
                                        <Clip/>
                                    </p>
                                </div>
                            </div>

                            <div className="flex w-full py-4 border-b border-rose-700">
                                <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
                                <div className="flex flex-col flex-grow ml-2">
                                    <div className="flex text-sm">
                                        <span className="font-semibold">Username</span>
                                        <span className="ml-1">@username</span>
                                    </div>
                                    <p className="mt-1 text-sm">
                                       <Clip/>
                                    </p>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>

            <a
                className="fixed flex items-center justify-center h-8 pr-2 pl-1 bg-red-600 rounded-full bottom-0 right-0 mr-4 mb-4 shadow-lg text-blue-100 "
                href="https://twitter.com/thedhinakarr"
                target="_top"
            >
                <span className="text-sm ml-1 leading-none">@thedhinakarr</span>
            </a>
        </div>

    )
}
