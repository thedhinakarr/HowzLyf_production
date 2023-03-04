import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
    const [userData,setUserData] = useState({
        email:"",
        password:"",
    })

    function OnChangeHandler(e){
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
        console.log(userData)
    }

    async  function OnSubmitHandler(e){
        try {
            e.preventDefault();
           let { data } = await axios.post("/api/user/login", userData);
          localStorage.setItem("token", JSON.stringify(data.token));
          console.log(localStorage.getItem("token"))
          alert("LOGIN Successfull")

        } catch (error) {
            alert(error.response.data.error);
            console.log(error)
        }
     }

    return (
        <div>

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
                                Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>

                                    <input
                                        onChange={OnChangeHandler}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="name@company.com"
                                        className="bg-black border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:border-red-600 dark:placeholder-gray-400 dark:text-white"
                                        required=""
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
                                        onChange={OnChangeHandler}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-black border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:border-red-600 dark:placeholder-gray-400 dark:text-white"
                                        required=""
                                    />
                                </div>

                                <button
                                    onClick={OnSubmitHandler}
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-red-900 hover:border focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign-in
                                </button>
                                <p className="text-sm font-light text-red-500 ">
                                    Don't have an account?{" "}
                                    <a
                                        href="/register"
                                        className="font-medium text-red-600 hover:underline dark:text-primary-500"
                                    >
                                        Register here
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
