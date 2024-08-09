import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { lsToCurrentState, signIn } from '../../reducer/AdminSlice';

const Author = () => {
    const {BASE_URL, openToast} = useContext(Context)
    const dispatcher = useDispatch();
    const navigator = useNavigate();
    const author = useSelector(store => store.admin);

    useEffect(
        ()=>{
            const lsAdmin = localStorage.getItem("admin");
            if(!lsAdmin){
                navigator("/admin/sign-in")
            }
            dispatcher(lsToCurrentState());
        },[]
    )

    function authorHandler(e) {
        e.preventDefault();
        const name = e.target.name.value.toLowerCase();
        const lastName = e.target.lastName.value.toLowerCase();
        const email = e.target.email.value.toLowerCase();
        const password = e.target.password.value;
        if (name != '' && email != '' && password != '') {
            axios.post(BASE_URL + "/admin/create-author", {
                "name": name,
                "email": email,
                "password": password,
                "lastName" : lastName
            }, {
                headers : {
                    Authorization : author.token
                }
            })
                .then(
                    (success) => {
                        if (success.data.status == 1) {
                            dispatcher(signIn(success.data));
                            navigator("/admin")
                        } else {
                            openToast(success.data.msg, "error")
                        }
                    }
                ).catch(
                    (error) => {

                    }
                )
        } else {

        }
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
                                Create Author
                            </h1>
                            <form onSubmit={authorHandler} className="space-y-4 tablet:space-y-6">
                                <div className='flex gap-2'>
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 mobile:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter first name"
                                            required=""
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 mobile:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter last name"
                                            required=""
                                        />
                                    </div>
                                </div>
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
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Author;
