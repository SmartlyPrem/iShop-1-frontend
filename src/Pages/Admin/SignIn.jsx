import React, { useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { Context } from '../../Context/MainContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signIn } from '../../reducer/AdminSlice';

const SignIn = () => {
    const {BASE_URL, openToast} = useContext(Context);
    const dispatcher = useDispatch();
    const navigator = useNavigate();

    function signInHandler (e){
        e.preventDefault();
        const data = {
            email : e.target.email.value,
            password : e.target.password.value,
            checkbox : e.target.checkbox.checked
        }
        axios.post(BASE_URL + "/admin/sign-in", data)
        .then(
            (success) => {
                if (success.data.status === 1) {
                    console.log(success.data);
                    dispatcher(signIn(success.data));
                    navigator("/admin");
                }else{
                    openToast(success.data.msg, "error")
                }
            }
        ).catch(
            (error) => {
            }
        )
    }

    return (
        <>
            <section className="bg-gray-50 h-screen dark:bg-gray-900">
                <div className="flex flex-col w-full mobile:w-[80%] tablet:w-[60%] desktop:w-[40%] items-center justify-center px-6 py-8 mx-auto tablet:h-screen laptop:py-0">
                    <Link
                        to={"/"}
                        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        <img
                            className="w-[70px] tablet:w-[100px]"
                            src="img/Home/iSHOP Logo.svg"
                            alt="logo"
                        />
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border tablet:mt-0 mobile:max-w-md desktop:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 tablet:space-y-6 mobile:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 tablet:text-2xl dark:text-white">
                                Sign in to your Admin Panel
                            </h1>
                            <form className="space-y-4 tablet:space-y-6" onSubmit={signInHandler}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 mobile:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
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
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 mobile:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                name='checkbox'
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignIn;
