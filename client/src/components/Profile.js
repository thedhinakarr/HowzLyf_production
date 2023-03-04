import React from 'react'
import Clip from './Clip'
import Post from './Post'
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export default function Profile() {

    const [udata, setuData] = useState({});
    const [audiodata, setaudiodata] = useState([]);

    let libs = [];

    useEffect(() => {
        let getData = async () => {
            try {

                let ls = localStorage.getItem("token");
                ls = JSON.parse(ls)

                const config = {
                    headers: {
                        "auth-token": ls
                    }
                };

                let { data } = await axios.get(`/api/user/getUserDetailsByToken`, config);

                let repoData = await axios.get(`/api/audio/viewByUser`, config);
                console.log(data)
                console.log(repoData.data.result)
                setuData(data);
                setaudiodata(repoData.data.result);

            } catch (error) {
                console.error(error.response.data)
            }
        }
        getData();
    }, [])

    audiodata.forEach((ele) => {
        libs.push(
            <div className="flex flex-col mr-2 p-8 border border-red-500">
                <ReactPlayer controls
                    url={ele.audioUrl}
                    width="100%"
                    height="50px" />

                <button className="btn rounded-md mt-6 border border-gray-300 hover:bg-rose-700">
                    interact
                </button>

            </div>

        )
    });

    return (
        <div>
            <div className="flex flex-row h-screen text-white">

                <div className="flex flex-nowrap border-red-500 flex-col w-2/5 h-screen py-3 px-3  ">
                    <div className="mb-2 font-semibold rounded-lg text-lg items-center p-3 border border-red-500">Name: <span className="text-red-500">{udata.name}</span></div>


                    <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-red-500 border">UserName: <span className="text-red-500">{udata.userName}</span><p></p></div>
                    <div className="w-64 mb-2 object-fill font-semibold text-lg rounded-lg p-3  border-red-500 items-center"></div>
                    <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-red-500 border">BIO:  <span className="text-red-500"></span><p></p></div>

                    <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-red-500 border">Email: <span className="text-red-500">{udata.email}</span></div>

                </div>

                <div className="lex flex-nowrap flex-col h-screen w-3/5 py-9 px-5 border-red-500 ">
                    <button className="font-semibold  hover:bg-rose-500 w-40 h-10 py-1 mb-10 text-center border">Go Back</button>
                    <button className="font-semibold  hover:bg-rose-500 w-40 h-10 py-1 mb-10 ml-2 text-center border">Edit Profile</button>
                    {/* <div className="flex w-full p-8 overflow-auto border-b border-rose-700"> */}
                    {libs}
                    {/* </div> */}
                </div>

            </div>
        </div>
    )
}
