import { Fragment, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import Post from "./Post";
import Clip from "./Clip";

export default function CommentsTesting() {

    const [open, setOpen] = useState(1);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (

        <Fragment className="text-white mt-10">
            <button className="font-semibold justify-center hover:bg-rose-500 w-40 h-10 py-1 ml-5 mt-10 mb-5 text-center text-white border">Go Back</button>

            <div className="flex w-full p-8 overflow-auto mt-10 border border-rose-700">
                <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
                <div className="flex flex-col flex-grow ml-4">
                    <div className="flex">
                        <span className="text-white font-semibold">Username</span>
                        <span className="ml-1 text-rose-700">@username</span>
                        <span className="ml-auto text-sm">Just now</span>
                    </div>
                    <p className="mt-1">
                    </p>
                  
                    <div className="flex mt-2">

                        <Accordion open={open === 1} className="text-white">
                            <AccordionHeader onClick={() => handleOpen(1)} className="text-white">
                                <button className="btn mr-3 hover:bg-rose-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                </button>
                            </AccordionHeader>
                            <AccordionBody >
                             
                            </AccordionBody>
                        </Accordion>


                    </div>

                </div>
                <div className="flex flex-col">
                    <button className="font-semibold justify-center hover:bg-rose-500 w-40 h-10 py-1 ml-5 mt-10 mb-3 text-center border text-white">Add Comment</button>
                    <button className="font-semibold justify-center hover:bg-rose-500 w-40 h-10 py-1 ml-5  mb-3 text-center border text-white">Intresting </button>

                </div>

            </div>



        </Fragment>

    );
}