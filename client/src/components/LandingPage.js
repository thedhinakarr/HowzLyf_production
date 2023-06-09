import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function LandingPage() {
    let navigate=useNavigate();
    return (

        <div className="py-8 px-4 bg-black mx-auto justify-items-center h-screen w-screen text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-red-500 md:text-5xl lg:text-6xl "> ______________HowzLyf______________</h1>
            <p className="mb-8 text-lg font-normal text-rose-700 lg:text-xl sm:px-16 xl:px-48 "> The minimalistic social network for the modern minimalist.</p>
            <div clasName="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href="/register" className=" mr-4 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-700 bg-primary-700 hover:bg-rose-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Register
                </a>
                <a href="/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-300 hover:bg-rose-700 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-rose-700 dark:focus:ring-gray-800">
                    Login
                </a>
            </div>

        </div>

    )
}
