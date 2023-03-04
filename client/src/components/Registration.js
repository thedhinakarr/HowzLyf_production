import React from 'react'
import {useState} from "react";
import axios from 'axios';

export default function Registration() {

    const [userData,setUserData] = useState({
        name:"",
        userName:"",
        email:"",
        password:"",
        password2:""
    })

    let {name,userName,email,password,password2}= userData;

    function OnChangeHandler(e){
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
        console.log(userData)
    }

    async  function OnSubmitHandlder(e){
        try {
            e.preventDefault();
            let { data } = await axios.post("/api/user/register", userData);
            alert(data)
            console.log(data)
        } catch (error) {
            alert(error.response.data.error);
            console.log(error)
        }
     }


    return (
        <section className="bg-gray-50 dark:bg-black">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    HowzLyf.inc
                </a>
                <div className="w-full bg-black rounded-lg shadow dark:border-4 md:mt-0 sm:max-w-md xl:p-0   dark:border-red-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">

                        <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={OnChangeHandler}
                                    className="bg-black border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:border-red-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Pablo Escobar"
                                    required="true"
                                />

                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                   User name
                                </label>

                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    onChange={OnChangeHandler}
                                    className="bg-black border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:border-red-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="pabloEscobar_99"
                                    required="true"
                                />

                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                 Email
                                </label>

                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    onChange={OnChangeHandler}
                                    className="bg-black border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:border-red-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="name@company.com"
                                    required="true"
                                />

                            </div>


                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={OnChangeHandler}
                                    placeholder="••••••••"
                                    className="bg-black border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:border-red-600 dark:placeholder-gray-400 dark:text-white"
                                    required="true"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="password2"
                                    id="password2"
                                    onChange={OnChangeHandler}
                                    placeholder="••••••••"
                                    className="bg-black border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:border-red-600 dark:placeholder-gray-400 dark:text-white"
                                    required="true"
                                />
                            </div>
                          
                            <button
                                onClick={OnSubmitHandlder}
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-red-900 hover:border focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-red-500 ">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-medium text-red-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}
