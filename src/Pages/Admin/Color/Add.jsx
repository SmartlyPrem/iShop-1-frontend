import React, { useContext } from 'react';
import axios from "axios";
import { Context } from '../../../Context/MainContext';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const {openToast, BASE_URL, COLOR_URL, fetchColor} = useContext(Context);
    const navigator = useNavigate();
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const color = e.target.color.value;
        if(name != "" && color != ""){
            axios.post(BASE_URL + COLOR_URL + "/create", {name, color})
            .then(
                (success)=>{
                    if(success.data.status == 1){
                        openToast(success.data.msg, "success");
                        fetchColor();
                        navigator("/admin/color");
                    }else{
                        openToast(success.data.msg, "error")
                    }
                }
            ).catch(
                (error)=>{
                    openToast(error.data.msg, "error")
                }
            )
        }else{
            openToast("Please all data", "error");
        }

    }
    return (
        <div className='mb-14'>
            <div className='text-center text-2xl my-3 font-semibold'>Add Color</div>
            <form onSubmit={formSubmitHandler} className="w-full px-3 mx-auto mt-4">
                <div className='grid grid-cols-2 gap-2'>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Color Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-gray-50 border border-gray-300 capitalize text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Color"
                            required=""
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="color"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Color
                        </label>
                        <input
                            type="color"
                            id="color"
                            name="color"
                            className="h-[40px] bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add
                </button>
            </form>
        </div>
    );
}

export default Add;
