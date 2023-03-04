
import ReactPlayer from "react-player";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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

    async function onClickHandler(e){
        try {
            e.preventDefault();
            

        } catch (error) {
            
        }
    }




    return (
        <div className="flex w-full p-8 overflow-auto border-b border-rose-700">
            <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-4">
                <div className="flex">
                    <span className="font-semibold">{udata.name}</span>
                    <span className="ml-1 text-rose-700">@{udata.userName}</span>
                    <span className="ml-auto text-sm">{audio.createdAt}</span>
                </div>

                <p className="mt-1">
                    <ReactPlayer controls
                        url={audio.audioUrl}
                        width="100%"
                        height="50px" />
                </p>

                <div className="flex mt-2">

                    <button onClick={onClickHandler} className="btn mr-3 p-3 font-semibold hover:bg-rose-700 border border-white rounded-lg">
                       interact
                    </button>

                  
                </div>

            </div>
        </div>

    )
}
