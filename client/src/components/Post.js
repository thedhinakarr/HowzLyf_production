
import ReactPlayer from "react-player";
import axios from "axios";


import React, { useEffect, useState } from 'react'

export default function Post({ audio, user }) {
    const [udata, setuData] = useState({});

    useEffect(() => {
        let getData = async () => {
            try {
                let { data } = await axios.get(`/api/user/GetUserDetails?producedBy=${user}`);
                console.log(data);
                setuData(data);
            } catch (error) {
                console.error(error.response)
            }
        }
        getData();
    }, [udata]);


    return (
        <div className="flex w-full p-8 overflow-auto border-b border-rose-700">
            <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-4">
                <div className="flex">
                    <span className="font-semibold">{udata.name}</span>
                    <span className="ml-1 text-rose-700">@{udata.userName}</span>
                    <span className="ml-auto text-sm">Just now</span>
                </div>

                <p className="mt-1">
                    <ReactPlayer controls
                        url={audio.audioUrl}
                        width="100%"
                        height="50px" />
                </p>

                <div className="flex mt-2">

                    <button className="btn mr-3 hover:bg-rose-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>

                    <button className="btn mr-3 hover:bg-rose-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </button>


                </div>

            </div>
        </div>

    )
}
